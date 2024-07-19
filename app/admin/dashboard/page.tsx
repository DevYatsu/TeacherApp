import { DashBoardPage } from "@/components/admin/dashboard/dash-board-page";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Access the admin dashboard to manage and monitor site activities.",
  keywords: "admin dashboard, site management, admin panel, website monitoring",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function Component() {
  return <DashBoardPage />;
}
