import { Suspense, SVGProps } from "react";
import { notFound } from "next/navigation";
import { getFolderMetadata } from "@/lib/google-drive/folder";
import Link from "next/link";
import ClassRoomHeader from "./header";
import Chapter from "./chapter";
import FileDisplay from "./fileDisplay";

export default async function CustomClassPage({
  classroomId,
}: {
  classroomId: string;
}) {
  const folderData = await getFolderMetadata(classroomId);

  if (!folderData) {
    return notFound();
  }

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
        <ClassRoomHeader classroomName={folderData.name!} />
      </Suspense>
      <main className="flex flex-col items-center space-y-12 py-6 lg:py-10 xl:py-12 px-4 lg:px-8">
        <Chapter title="Chapter 1: Introduction to Computers">
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
        </Chapter>{" "}
        <Chapter title="Chapter 2: Test">
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
        </Chapter>{" "}
        <Chapter title="Chapter 3: Other Test">
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Example File.pdf"
            extension="PDF"
            sizeWithUnit="2.3 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />{" "}
          <FileDisplay
            fullName="Another efdfdfjkldhfdjfhdfjlfd.docx"
            extension="DOCX"
            sizeWithUnit="1.5 MB"
          />
        </Chapter>
      </main>
    </div>
  );
}

function HomeIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
