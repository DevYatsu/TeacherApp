import Link from "next/link";
import { Suspense } from "react";
import AdminClassRoomHeader from "./header";
import {
  getFolderMetadata,
  getNameAndStudentsNumberFromFolderName,
} from "@/lib/google-drive/folder";
import { notFound } from "next/navigation";

export default async function AdminClassPage({
  classroomId,
}: {
  classroomId: string;
}) {
  const folderData = await getFolderMetadata(classroomId);

  if (!folderData) {
    return notFound();
  }

  const { name } = getNameAndStudentsNumberFromFolderName(folderData.name!);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary py-4 shadow flex justify-center">
        <div className="container flex items-center justify-around">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-primary-foreground"
            prefetch={true}
          >
            <span className="text-lg font-medium">Dashboard</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/shared"
              className="text-primary-foreground hover:underline"
              prefetch={false}
            >
              Shared Files
            </Link>
            <Link
              href={"/classroom/" + classroomId}
              className="text-primary-foreground hover:underline"
              prefetch={true}
              target="_blank"
            >
              Student&apos;s Page
            </Link>
          </nav>
        </div>
      </header>
      <Suspense>
        <AdminClassRoomHeader classroomName={name} />
      </Suspense>
      <main className="flex flex-col items-center space-y-12 py-6 lg:py-10 xl:py-12 px-4 lg:px-8"></main>
    </div>
  );
}
