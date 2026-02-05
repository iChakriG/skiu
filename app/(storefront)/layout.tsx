import { AuthProvider } from "@/lib/auth/AuthContext";
import { StorefrontHeader } from "./StorefrontHeader";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <StorefrontHeader />
      {children}
    </AuthProvider>
  );
}
