// this file contains all operations on files

import { getDrive } from "./auth";

export const getAllFiles = async () => {
  const drive = await getDrive();
  const entities = await drive.files.list();
  const files = (entities.data.files ?? []).filter(
    (entity) => entity.mimeType !== "application/vnd.google-apps.folder"
  );

  return files;
};
