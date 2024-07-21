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
    const { name, parentFolderId } = await request.json();

    if (typeof name !== "string" || typeof parentFolderId !== "string") {
      return new Response("Invalid Body!", { status: 400 });
    }

    revalidatePath(`/admin/classroom/${parentFolderId}`);
    revalidatePath(`/classroom/${parentFolderId}`);
    const id = await createFolder(name, parentFolderId);

    if (!id) {
      return new Response(`Failed to create new chapter '${name}'!`, {
        status: 500,
      });
    }

    return Response.json(
      { id },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error creating chapter:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
};
