/**
 * Auth layout — minimal wrapper for login/signup pages.
 * No navbar, just the background + centered content.
 */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
