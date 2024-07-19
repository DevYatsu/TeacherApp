// this file contains all operations on files

import { drive_v3 } from "googleapis";
import { getDrive } from "./auth";

export const getAllFiles = async () => {
  const drive = await getDrive();
  const entities = await drive.files.list();
  const files = (entities.data.files ?? []).filter(
    (entity) => entity.mimeType !== "application/vnd.google-apps.folder"
  );

  return files;
};

export const createFile = async (file: File, folderId?: string) => {
  const drive = await getDrive();

  const fileMetadata: drive_v3.Schema$File = {
    name: file.name,
    parents: [],
  };

  if (folderId) {
    fileMetadata.parents = [folderId];
  }

  const media = {
    mimeType: "image/jpeg",
    body: file.stream(),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id",
  });

  return response.data.id;
};

export const deleteFile = async (fileId: string) => {
  const drive = await getDrive();

  await drive.files.delete({ fileId });
};

export const renameFile = async (fileId: string, newName: string) => {
  const drive = await getDrive();

  await drive.files.update({ fileId, requestBody: { name: newName } });
};

export const getFileMetadata = async (fileId: string) => {
  const drive = await getDrive();

  if (!fileId) {
    return;
  }

  try {
    const { data } = await drive.files.get({ fileId });

    if (data.mimeType === "application/vnd.google-apps.folder") {
      throw Error(`No file exists with id ${fileId}`);
    }

    return data;
  } catch (error: any) {
    return;
  }
};
