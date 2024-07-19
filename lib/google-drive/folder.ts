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

export const getFolderMetadata = async (folderId: string) => {
  const drive = await getDrive();

  if (!folderId) {
    return;
  }

  try {
    const { data } = await drive.files.get({ fileId: folderId });

    console.log(data);

    if (data.mimeType !== "application/vnd.google-apps.folder") {
      throw Error(`No folder exists with id ${folderId}`);
    }

    return data;
  } catch (error: any) {
    return;
  }
};

export const getAllFoldersNotInAnotherDir = async () => {
  const drive = await getDrive();
  const entities = await drive.files.list();
  const files = (entities.data.files ?? []).filter(
    (entity) =>
      entity.mimeType === "application/vnd.google-apps.folder" &&
      !entity.driveId
  );

  return files;
};

export const getNameAndStudentsNumberFromFolderName = (folderName: string) => {
  let name = folderName;
  const parts = name.split(" - ");

  if (parts.length === 1) {
    return { name, studentsNumber: 0 };
  }

  const stringNumber = parts.pop()?.trim();
  const studentsNumber = parseInt(stringNumber!);

  if (isNaN(studentsNumber)) {
    return { name, studentsNumber: 0 };
  }

  name = parts.join(" - ").trim();
  return { name, studentsNumber };
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
      const { name, studentsNumber } = getNameAndStudentsNumberFromFolderName(
        f.name!
      );

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
