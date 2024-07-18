"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateClassModal from "./CreateClassModal";
import { useState } from "react";

export default function ClassesSection() {
  const [openModal, setOpenModal] = useState(false);

  // fetch les classrooms
  const classrooms: { title: string; studentsNumber?: number }[] = [
    { title: "Math 101" },
    { title: "Math 09" },
    { title: "Math 1", studentsNumber: 30 },

    { title: "Math 3" },
  ];

  return (
    <div className="container">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classrooms.map((room) => {
          return (
            <ClassCard
              title={room.title}
              studentsNumber={room.studentsNumber}
              key={room.title}
            />
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <CreateClassModal open={openModal} setIsOpen={setOpenModal} />
        <Button onClick={() => setOpenModal(true)}>Create New Classroom</Button>
      </div>
    </div>
  );
}

function ClassCard({
  title,
  studentsNumber,
}: {
  title: string;
  studentsNumber?: number;
}) {
  return (
    <Card>
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
