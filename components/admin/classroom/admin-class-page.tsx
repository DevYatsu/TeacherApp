import Link from "next/link";
import { Suspense } from "react";
import AdminClassRoomHeader from "./header";
import {
  getFilesInFolder,
  getFolderMetadata,
  getFoldersInFolder,
  getNameAndStudentsNumberFromFolderName,
} from "@/lib/google-drive/folder";
import { notFound } from "next/navigation";
import AdminChapter from "./chapter";
import FileDisplay from "@/components/ui/fileDisplay";
import AddChapterButton from "./AddChapterButton";

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

  // reverse to display oldest first
  const chaptersData = (await getFoldersInFolder(classroomId)).reverse();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary py-4 shadow flex justify-center">
        <div className="container flex items-center justify-around">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-primary-foreground hover:text-secondary-foreground duration-300"
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
      <main className="flex flex-col justify-center items-center space-y-12 py-6 lg:py-10 xl:py-12 px-4 lg:px-8">
        <div className="container">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Chapters</h2>
              <AddChapterButton folderId={classroomId} />
            </div>
            <div className="grid gap-4">
              {chaptersData.map(async (chapter) => {
                const files = (await getFilesInFolder(chapter.id!)).reverse();

                return (
                  <AdminChapter
                    name={chapter.name!}
                    key={chapter.id}
                    id={chapter.id!}
                    parentFolderId={classroomId}
                  >
                    {files.length === 0
                      ? "No file to display for the moment, the chapter does not appear for the students"
                      : files.map((file) => (
                          <FileDisplay
                            fullName={file.name!}
                            extension={file.fullFileExtension!}
                            sizeWithUnit={file.size!}
                            fileId={file.id!}
                            addDownloadButton
                            addDeleteButton
                            key={file.id}
                          />
                        ))}
                  </AdminChapter>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
