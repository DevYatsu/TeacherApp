import { createFolder } from "@/lib/google-drive/folder";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {};

export const POST = async (request: Request) => {
  const result = await request.json();

  if (typeof result.name === "string") {
    const folderName =
      result.name +
      (result.studentsNumber ? " - " + result.studentsNumber : "");

    const folderId = await createFolder(folderName);

    if (folderId) {
      revalidatePath("/admin/dashboard");
      return NextResponse.json({ folderId });
    }
  }

  return new NextResponse("Failed to create a new classroom drive", {
    status: 400,
  });
};
