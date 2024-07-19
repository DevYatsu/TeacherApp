require("dotenv").config();
import { google } from "googleapis";

const SCOPES = {
  // recommanded + non-sensitive
  EDIT_OR_MODIFY_FILES: "https://www.googleapis.com/auth/drive.file",

  // restricted
  FULL_PERMS: "https://www.googleapis.com/auth/drive",
  READ_ONLY: "https://www.googleapis.com/auth/drive.readonly",
  METADATA_ONLY: "https://www.googleapis.com/auth/drive.metadata.readonly",
};

export const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [SCOPES.EDIT_OR_MODIFY_FILES],
});

export const getDrive = async () => google.drive({ auth, version: "v3" });
