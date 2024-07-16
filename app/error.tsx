import { ErrorPage } from "@/components/error-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Page",
  description:
    "An error has occurred. Please check the URL or try again later.",
};

export default function Page() {
  return <ErrorPage />;
}
