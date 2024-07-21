// this file contains all operations on folders

import { drive_v3 } from "googleapis";
import { getDrive } from "./auth";

// create a folder and returns its id on success
export const createFolder = async (name: string, parentFolderId?: string) => {
  if (!name) return;

  const drive = await getDrive();

  const fileMetadata: drive_v3.Schema$File = {
    name,
    mimeType: "application/vnd.google-apps.folder",
    parents: parentFolderId ? [parentFolderId] : undefined,
  };

  const file = await drive.files.create({
    requestBody: fileMetadata,
    fields: "id",
  });

  return file.data.id;
};

export const getFoldersInFolder = async (folderId: string) => {
  const drive = await getDrive();

  try {
    const response = await drive.files.list({
      q: `mimeType = 'application/vnd.google-apps.folder' and '${folderId}' in parents`,
      fields: "files(id, name)",
    });

    const files = response.data.files ?? [];

    return files as unknown as {
      id: string;
      name: string;
    }[];
  } catch (error: any) {
    console.error(`Error retrieving folders in folder: ${error.message}`);
    throw new Error(`An error occurred: ${error.message}`);
  }
};

export const getFilesInFolder = async (folderId: string) => {
  const drive = await getDrive();

  try {
    const response = await drive.files.list({
      q: `mimeType != 'application/vnd.google-apps.folder' and '${folderId}' in parents`,
      fields: "files(id, name, mimeType, fullFileExtension, size)",
    });

    const files = response.data.files ?? [];

    return files as unknown as {
      id: string;
      name: string;
      mimeType: string;
      fullFileExtension: string;
      size: string;
    }[];
  } catch (error: any) {
    console.error(`Error retrieving files in folder: ${error.message}`);
    throw new Error(`An error occurred: ${error.message}`);
  }
};

export const getFolderMetadata = async (folderId: string) => {
  const drive = await getDrive();

  if (!folderId) {
    return;
  }

  try {
    const { data } = await drive.files.get({
      fileId: folderId,
      fields: "id, name, mimeType, parents",
    });

    if (data.mimeType !== "application/vnd.google-apps.folder") {
      throw Error(`No folder exists with id ${folderId}`);
    }

    return data as unknown as {
      id: string;
      name: string;
      mimeType: string;
      parents: string[];
    };
  } catch (error: any) {
    return;
  }
};

export const getAllFoldersNotInAnotherDir = async () => {
  const drive = await getDrive();
  const entities = await drive.files.list({
    q: "mimeType = 'application/vnd.google-apps.folder' and 'root' in parents",
    fields: "files(id, name)",
  });
  const files = entities.data.files ?? [];

  return files as unknown as {
    id: string;
    name: string;
  }[];
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
  const folders = await getAllFoldersNotInAnotherDir();
  const deletePromises = folders.map((folder) => deleteFolder(folder.id!));
  await Promise.all(deletePromises);
};
