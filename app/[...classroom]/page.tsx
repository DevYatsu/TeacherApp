"use client";
import { CustomClassPage } from "@/components/custom-class-page";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname().slice(1);
  const index = pathname.indexOf("?");
  let classroomName = pathname;

  if (index !== -1) {
    classroomName = pathname.slice(0, index);
  }
  return <CustomClassPage classroomName={classroomName} />;
}
