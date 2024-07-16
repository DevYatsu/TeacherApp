import { LogoutPage } from "@/components/logout/logout-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Logout",
  description: "Logout to the admin dashboard to manage the site.",
  keywords: "admin logout, dashboard access, site management",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <LogoutPage />;
}
