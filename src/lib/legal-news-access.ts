
import { NextResponse } from 'next/server';

import { NewsError } from '@/lib/legal-news-server';
import {
  isPrimaryAdminEmail,
  normalizeEmail,
} from '@/lib/dashboard-identity';

type FirebaseIdentity = {
  uid: string;
  email: string;
  emailVerified: boolean;
};

type FirebaseAccount = {
  localId?: string;
  email?: string;
  emailVerified?: boolean;
  disabled?: boolean;
};

type FirestoreField = {
  stringValue?: string;
  booleanValue?: boolean;
  mapValue?: {
    fields?: Record<string, FirestoreField>;
  };
};

type FirestoreDocument = {
  fields?: Record<string, FirestoreField>;
};

type DashboardAccess = {
  status: string;
  dashboard: boolean;
  legalNews: boolean;
};

const getFirebaseConfig = () => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    throw new NewsError(
      'Firebase configuration is unavailable.',
      503
    );
  }

  return { apiKey, projectId };
};

const getBearerToken = (request: Request): string => {
  const authorization = request.headers.get('authorization');

  const match = authorization?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    throw new NewsError(
      'Authentication required.',
      401
    );
  }

  return match[1];
};

function logError(stage: string, error: unknown) {
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error
      ? String(error.code)
      : 'UNKNOWN';

  console.error('[Legal News]', {
    stage,
    code,
    name: error instanceof Error ? error.name : 'UnknownError',
  });
}

/**
 * Ask Firebase Authentication to validate the user's
 * existing ID token. No Firebase Admin SDK required.
 */
async function getIdentity(
  token: string
): Promise<FirebaseIdentity> {
  const { apiKey } = getFirebaseConfig();

  let response: Response;

  try {
    response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      }
    );
  } catch (error) {
    logError('firebase-auth-connection', error);

    throw new NewsError(
      'Firebase Authentication is temporarily unavailable.',
      503
    );
  }

  if (!response.ok) {
    if (response.status === 400 || response.status === 401) {
      throw new NewsError(
        'Invalid or expired credentials.',
        401
      );
    }

    console.error('[Legal News] Firebase Auth HTTP:', response.status);

    throw new NewsError(
      'Unable to verify Firebase authentication.',
      503
    );
  }

  const result = (await response.json()) as {
    users?: FirebaseAccount[];
  };

  const account = result.users?.[0];

  if (
    !account?.localId ||
    !account.email ||
    account.disabled
  ) {
    throw new NewsError(
      'Authenticated Firebase account is unavailable.',
      403
    );
  }

  return {
    uid: account.localId,
    email: normalizeEmail(account.email),
    emailVerified: account.emailVerified === true,
  };
}

/**
 * Load dashboard permissions using the caller's
 * Firebase ID token. Firestore Security Rules apply.
 */
async function getAccessDocument(
  email: string,
  token: string
): Promise<DashboardAccess | null> {
  const { projectId } = getFirebaseConfig();

 const documentId = encodeURIComponent(
  encodeURIComponent(normalizeEmail(email))
);

  const url =
    `https://firestore.googleapis.com/v1/projects/` +
    `${encodeURIComponent(projectId)}/databases/(default)/` +
    `documents/dashboardAccessUsers/${documentId}`;

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    logError('firestore-read-connection', error);

    throw new NewsError(
      'Firestore is temporarily unavailable.',
      503
    );
  }

  if (response.status === 404) {
    return null;
  }

  if (response.status === 401) {
    throw new NewsError(
      'Firebase session expired.',
      401
    );
  }

  if (response.status === 403) {
    throw new NewsError(
      'Firestore rules do not permit this access check.',
      403
    );
  }

  if (!response.ok) {
    console.error('[Legal News] Firestore HTTP:', response.status);

    throw new NewsError(
      'Unable to read dashboard permissions.',
      503
    );
  }

  const document =
    (await response.json()) as FirestoreDocument;

  const fields = document.fields || {};
  const permissions = fields.permissions?.mapValue?.fields || {};

  return {
    status: fields.status?.stringValue || '',
    dashboard: permissions.dashboard?.booleanValue === true,
    legalNews: permissions.legalNews?.booleanValue === true,
  };
}

/**
 * Authenticate and authorize Legal News management.
 * Called by the existing Legal News CRUD APIs.
 */
export async function getLegalNewsAccess(
  request: Request
): Promise<boolean> {
  const token = getBearerToken(request);
  const identity = await getIdentity(token);

  if (isPrimaryAdminEmail(identity.email)) {
    return identity.emailVerified;
  }

  const access = await getAccessDocument(
    identity.email,
    token
  );

  return (
    access?.status === 'active' &&
    access.dashboard === true &&
    access.legalNews === true
  );
}

export async function requireLegalNewsAccess(
  request: Request
): Promise<void> {
  const allowed = await getLegalNewsAccess(request);

  if (!allowed) {
    throw new NewsError(
      'Legal News permission is required.',
      403
    );
  }
}

export async function readNewsBody(
  request: Request
): Promise<Record<string, unknown>> {
  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body)
    ) {
      throw new NewsError(
        'Invalid JSON body.',
        400
      );
    }

    return body as Record<string, unknown>;
  } catch (error) {
    if (error instanceof NewsError) {
      throw error;
    }

    throw new NewsError(
      'Invalid JSON body.',
      400
    );
  }
}

/**
 * Update Legal News permission in the existing
 * Firestore dashboardAccessUsers collection.
 *
 * Uses the primary administrator's Firebase token.
 * Firestore Security Rules must authorize the update.
 */
export async function setLegalNewsAccess(
  request: Request
): Promise<void> {
  const token = getBearerToken(request);
  const identity = await getIdentity(token);

  if (
    !isPrimaryAdminEmail(identity.email) ||
    !identity.emailVerified
  ) {
    throw new NewsError(
      'Verified primary administrator access is required.',
      403
    );
  }

  const body = await readNewsBody(request);

  if (
    typeof body.email !== 'string' ||
    typeof body.enabled !== 'boolean' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
  ) {
    throw new NewsError(
      'Invalid permission request.',
      400
    );
  }

  const email = normalizeEmail(body.email);

  if (isPrimaryAdminEmail(email)) {
    throw new NewsError(
      'Primary administrator permissions cannot be modified.',
      403
    );
  }

  const access = await getAccessDocument(email, token);

  if (
    !access ||
    access.status !== 'active' ||
    !access.dashboard
  ) {
    throw new NewsError(
      'Select an active dashboard user.',
      403
    );
  }

  const { projectId } = getFirebaseConfig();

 const documentId = encodeURIComponent(
  encodeURIComponent(email)
);

  const url =
    `https://firestore.googleapis.com/v1/projects/` +
    `${encodeURIComponent(projectId)}/databases/(default)/` +
    `documents/dashboardAccessUsers/${documentId}` +
    `?updateMask.fieldPaths=permissions.legalNews`;

  let response: Response;

  try {
    response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          permissions: {
            mapValue: {
              fields: {
                legalNews: {
                  booleanValue: body.enabled,
                },
              },
            },
          },
        },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    logError('firestore-permission-update', error);

    throw new NewsError(
      'Unable to update Legal News permission.',
      503
    );
  }

  if (response.status === 401) {
    throw new NewsError(
      'Firebase session expired.',
      401
    );
  }

  if (response.status === 403) {
    throw new NewsError(
      'Firestore Security Rules denied the permission update.',
      403
    );
  }

  if (!response.ok) {
    console.error(
      '[Legal News] Permission update HTTP:',
      response.status
    );

    throw new NewsError(
      'Failed to update Legal News permission.',
      503
    );
  }
}

export async function legalNewsResponse(
  action: () => Promise<unknown>,
  status = 200
) {
  const headers = {
    'Cache-Control': 'no-store',
  };

  try {
    const data = await action();

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status,
        headers,
      }
    );
  } catch (error) {
    if (error instanceof NewsError) {
      if (error.status >= 500) {
        logError('server-error', error);
      }

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: error.status,
          headers,
        }
      );
    }

    logError('unexpected-error', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Legal News is temporarily unavailable.',
      },
      {
        status: 500,
        headers,
      }
    );
  }
}
