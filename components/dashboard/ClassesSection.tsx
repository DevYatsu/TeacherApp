import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAllFolders, getBasicFolderData } from "@/lib/google-drive/folder";
import Link from "next/link";
import CreateClassroomButton from "./CreateClassroomButton";
import { RefAttributes } from "react";

export default async function ClassesSection() {
  const folders = await getAllFolders();
  const foldersData = getBasicFolderData(folders);

  return (
    <div className="container">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {foldersData.map((classroom) => {
          return (
            <ClassCard
              title={classroom.name}
              studentsNumber={classroom.studentsNumber}
              key={classroom.id}
              data-folder-id={classroom.id}
            />
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <CreateClassroomButton />
      </div>
    </div>
  );
}

function ClassCard({
  title,
  studentsNumber,
  ...props
}: {
  title: string;
  studentsNumber?: number;
} & RefAttributes<HTMLDivElement>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Students</span>
          <span>{studentsNumber ?? "-"}</span>
        </div>
        <Link href={`/${title}`} className="text-primary" prefetch={false}>
          Class documents
        </Link>
      </CardContent>
    </Card>
  );
}
