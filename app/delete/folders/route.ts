import { deleteAllFolders } from "@/lib/google-drive/folder";

// PROTECTED BY AUTH MIDDLEWARE

export const GET = async (request: Request) => {
  await deleteAllFolders();
  return new Response("All good!");
};
