import authOptions from "@/lib/authOptions";
import { createFolder } from "@/lib/google-drive/folder";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { name, studentsNumber } = await request.json();

    if (typeof name !== "string" || typeof studentsNumber !== "string") {
      return new Response("Invalid body!", { status: 400 });
    }

    const folderName = name + (studentsNumber ? ` - ${studentsNumber}` : "");

    const folderId = await createFolder(folderName);

    if (folderId) {
      revalidatePath("/admin/dashboard");
      return Response.json(
        { id: folderId },
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Failed to create a new classroom", {
      status: 500,
    });
  } catch (error: any) {
    console.error("Error creating classroom:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
