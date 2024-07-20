import { Suspense, SVGProps } from "react";
import { notFound } from "next/navigation";
import {
  getFolderMetadata,
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
      <main className="flex flex-col items-center space-y-12 py-6 lg:py-10 xl:py-12 px-4 lg:px-8">
        <Chapter title="Chapter 1: Introduction to Computers">
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="ZIP"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="PNG"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="JSON"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="PPTX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="mp3"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
        </Chapter>{" "}
        <Chapter title="Chapter 2: Test">
          <FileDisplay
            fullName="Example File.pdf"
            extension="mp4"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
        </Chapter>{" "}
        <Chapter title="Chapter 3: Other Test">
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
            fileId={""}
            addDownloadLink
          />
        </Chapter>
      </main>
    </div>
  );
}
