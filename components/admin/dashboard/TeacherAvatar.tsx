"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeacherAvatar() {
  const { data: session } = useSession();

  const name = session?.user?.name ?? "John Doe";

  return (
    <>
      <Avatar className="border">
        <AvatarImage src="/placeholder-user.jpg" alt="AvatarImage" />
        <AvatarFallback>
          {name
            .split(" ")
            .map((s) => s[0].toUpperCase())
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="grid gap-0.5">
        <div className="font-medium text-sm sm:text-lg">{name}</div>
        <div className="text-sm text-muted-foreground">Teacher</div>
      </div>
    </>
  );
}
