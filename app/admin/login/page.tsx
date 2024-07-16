import { LoginPage } from "@/components/login/login-page";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to the admin dashboard to manage the site.",
  keywords: "admin login, dashboard access, site management",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function Component() {
  return <LoginPage />;
}
