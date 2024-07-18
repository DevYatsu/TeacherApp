require("dotenv").config();
import { google } from "googleapis";

export async function getAuthClient(scopes: string[]) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  google.options({
    auth: oauth2Client,
  });

  return oauth2Client;
}
