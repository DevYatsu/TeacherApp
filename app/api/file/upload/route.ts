import authOptions from "@/lib/authOptions";
import { createFile } from "@/lib/google-drive/files";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const formData = await request.formData();

    // id == chapter.id
    const id = formData.get("id");

    const parentFolderId = formData.get("parentFolderId");

    if (typeof id !== "string" || typeof parentFolderId !== "string") {
      return new Response("Invalid Body!", { status: 400 });
    }

    const createPromises = formData.getAll("files").map(async (entry) => {
      const file = entry as File;

      return createFile(file, id);
    });

    revalidatePath(`/classroom/${parentFolderId}`);
    revalidatePath(`/admin/classroom/${parentFolderId}`);
    await Promise.all(createPromises);

    return new Response("Documents created!", {
      status: 201,
    });
  } catch (error: any) {
    console.error("Error creating chapter:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
};
