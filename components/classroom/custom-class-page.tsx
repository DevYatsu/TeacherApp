import { Suspense, SVGProps } from "react";
import { notFound } from "next/navigation";
import {
  getFilesInFolder,
  getFolderMetadata,
  getFoldersInFolder,
  getNameAndStudentsNumberFromFolderName,
} from "@/lib/google-drive/folder";
import Link from "next/link";
import ClassRoomHeader from "./header";
import Chapter from "./chapter";
import FileDisplay from "../ui/fileDisplay";
import { HomeIcon } from "lucide-react";

export default async function CustomClassPage({
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
            href="/"
            className="flex items-center gap-2 text-primary-foreground"
            prefetch={true}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-lg font-medium">Home</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/shared"
              className="text-primary-foreground hover:underline"
              prefetch={false}
            >
              Shared Files
            </Link>
          </nav>
        </div>
      </header>
      <Suspense>
        <ClassRoomHeader classroomName={name} />
      </Suspense>
      <main className="flex items-center justify-center py-6 lg:py-10 xl:py-12 px-4 lg:px-8">
        <div className="container space-y-12">
          {chaptersData.map(async (chapter) => {
            const files = (await getFilesInFolder(chapter.id!)).reverse();

            return (
              <Chapter title={chapter.name!} key={chapter.id}>
                {files.length === 0
                  ? "No file to display for the moment, the chapter does not appear for the students"
                  : files.map((file) => (
                      <FileDisplay
                        fullName={file.name!}
                        extension={file.fullFileExtension!}
                        sizeWithUnit={file.size!}
                        fileId={file.id!}
                        addDownloadButton
                        key={file.id}
                      />
                    ))}
              </Chapter>
            );
          })}
        </div>{" "}
      </main>
    </div>
  );
}
