// this file contains all operations on files

import { drive_v3 } from "googleapis";
import { getDrive } from "./auth";
import fs from "fs";
import { Readable } from "stream";

export const getAllFiles = async () => {
  const drive = await getDrive();

  const entities = await drive.files.list({
    q: "mimeType != application/vnd.google-apps.folder",
  });

  const files = entities.data.files ?? [];

  return files;
};

const readableStreamToNodeStream = (
  readableStream: ReadableStream<Uint8Array>
): Readable => {
  const reader = readableStream.getReader();

  return Readable.from(
    (async function* () {
      while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    })()
  );
};

export const createFile = async (file: File, folderId?: string) => {
  const drive = await getDrive();

  const requestBody: drive_v3.Schema$File = {
    name: file.name,
    parents: folderId ? [folderId] : undefined,
  };

  const media = {
    mimeType: file.type,
    body: readableStreamToNodeStream(file.stream()),
  };

  const response = await drive.files.create({
    requestBody,
    media,
    fields: "id",
  });

  await drive.permissions.create({
    fileId: response.data.id!,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
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
