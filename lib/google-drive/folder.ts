// this file contains all operations on folders

import { drive_v3 } from "googleapis";
import { getDrive } from "./auth";

// create a folder and returns its id on success
export const createFolder = async (name: string) => {
  if (!name) return;

  const drive = await getDrive();

  const fileMetadata = {
    name,
    mimeType: "application/vnd.google-apps.folder",
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    fields: "id",
  });

  return file.data.id;
};

export const getAllFolders = async () => {
  const drive = await getDrive();
  const entities = await drive.files.list();
  const files = (entities.data.files ?? []).filter(
    (entity) => entity.mimeType === "application/vnd.google-apps.folder"
  );

  return files;
};

export const getBasicFolderData = (folders: drive_v3.Schema$File[]) => {
  return folders
    .filter((f) => {
      if (!f.name || !f.id) {
        return false;
      }
      return true;
    })
    .map((f) => {
      const id = f.id!;
      let name = f.name!;
      const parts = f.name!.split("-");

      if (parts.length === 1) {
        return { id, name, studentsNumber: 0 };
      }

      const stringNumber = parts.pop()?.trim();
      const studentsNumber = parseInt(stringNumber!);

      if (isNaN(studentsNumber)) {
        return { id, name, studentsNumber: 0 };
      }

      name = parts.join("-").trim();
      return { name, id, studentsNumber };
    });
};

export const deleteFolder = async (folderId: string) => {
  const drive = await getDrive();
  await drive.files.delete({ fileId: folderId });
};

export const deleteAllFolders = async () => {
  const folders = await getAllFolders();
  folders.forEach(async (folder) => await deleteFolder(folder.id!));
};
