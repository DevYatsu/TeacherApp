import { LoginPage } from "@/components/admin/login/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to the admin dashboard to manage the site.",
  keywords: "admin login, dashboard access, site management",
  robots: "noindex, nofollow",
};

export default function Component() {
  return <LoginPage />;
}
