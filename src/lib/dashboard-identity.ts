export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getPrimaryAdminEmail = () => normalizeEmail(process.env.NEXT_PUBLIC_PRIMARY_ADMIN_EMAIL || 'althakeel.com@gmail.com');

export const isPrimaryAdminEmail = (email: string) => {
  const primaryAdminEmail = getPrimaryAdminEmail();
  return Boolean(primaryAdminEmail) && normalizeEmail(email) === primaryAdminEmail;
};
