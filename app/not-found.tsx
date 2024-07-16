import { PageNotFound } from "@/components/404-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Not Found",
  description:
    "The page you are looking for does not exist. Please check the URL or return to the homepage.",
};

export default function Page() {
  return <PageNotFound />;
}
