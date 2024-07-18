"use client";
import { usePathname } from "next/navigation";

export default function ClassRoomHeader() {
  const pathname = usePathname().slice(1);
  const index = pathname.indexOf("?");
  let classroomName = pathname;

  if (index !== -1) {
    classroomName = pathname.slice(0, index);
  }

  classroomName = decodeURI(classroomName);
  return (
    <section className="flex bg-primary py-8 md:py-12 lg:py-16 justify-center">
      <div className="container flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tighter text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {classroomName}
        </h1>
        <p className="max-w-[600px] text-primary-foreground md:text-lg">
          Browse and download the files studied during the year in the{" "}
          {classroomName}!
        </p>
      </div>
    </section>
  );
}
