import { getFirestore } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { NewsError } from '@/lib/legal-news-server';
import { isPrimaryAdminEmail, normalizeEmail } from '@/lib/dashboard-identity';

async function getIdentity(request: Request) {
  const token = request.headers.get('authorization')?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) throw new NewsError('Authentication required.', 401);
  const auth = adminAuth();
  try {
    const identity = await auth.verifyIdToken(token, true);
    if (!identity.email) throw new NewsError('An email address is required.', 403);
    return { uid: identity.uid, email: normalizeEmail(identity.email) };
  } catch (error) {
    if (error instanceof NewsError) throw error;
    throw new NewsError('Invalid or expired credentials.', 401);
  }
}

const accessRecord = (email: string) =>
  getFirestore().collection('dashboardAccessUsers').doc(encodeURIComponent(email));

export async function requireLegalNewsAccess(request: Request) {
  const identity = await getIdentity(request);
  if (isPrimaryAdminEmail(identity.email)) return;
  const [record, user] = await Promise.all([
    accessRecord(identity.email).get(),
    adminAuth().getUser(identity.uid),
  ]);
  const access = record.data();
  if (access?.status !== 'active' || access.permissions?.dashboard !== true || access.permissions?.legalNews !== true || user.customClaims?.legalNews !== true) {
    throw new NewsError('Legal News permission is required.', 403);
  }
}

export async function setLegalNewsAccess(request: Request) {
  const identity = await getIdentity(request);
  if (!isPrimaryAdminEmail(identity.email)) throw new NewsError('Primary administrator access is required.', 403);
  const body = await readNewsBody(request);
  if (typeof body?.email !== 'string' || typeof body.enabled !== 'boolean') throw new NewsError('Invalid permission request.');
  const email = normalizeEmail(body.email);
  const record = accessRecord(email);
  const access = (await record.get()).data();
  if (isPrimaryAdminEmail(email) || access?.status !== 'active' || access.permissions?.dashboard !== true) {
    throw new NewsError('Select an active dashboard user.');
  }
  const auth = adminAuth();
  let user;
  try {
    user = await auth.getUserByEmail(email);
  } catch (error) {
    if ((error as { code?: string }).code === 'auth/user-not-found') throw new NewsError('Provision this user’s Firebase login first.', 404);
    throw error;
  }
  if (body.enabled) {
    await record.update({ 'permissions.legalNews': true });
    await auth.setCustomUserClaims(user.uid, { ...user.customClaims, legalNews: true });
  } else {
    await auth.setCustomUserClaims(user.uid, { ...user.customClaims, legalNews: false });
    await record.update({ 'permissions.legalNews': false });
  }
}

export async function readNewsBody(request: Request) {
  try {
    return await request.json();
  } catch {
    throw new NewsError('Invalid JSON body.');
  }
}

export async function legalNewsResponse(action: () => Promise<unknown>, status = 200) {
  const headers = { 'Cache-Control': 'no-store' };
  try {
    return NextResponse.json({ success: true, data: await action() }, { status, headers });
  } catch (error) {
    if (error instanceof NewsError) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status, headers });
    }
    console.error('Legal News request failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json({ success: false, message: 'Legal News is temporarily unavailable.' }, { status: 500, headers });
  }
}
