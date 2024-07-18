import { User } from "next-auth";
import { v4 as uuidv4 } from "uuid";

type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (username, password) => {
  if (
    username !== process.env.TEACHER_USERNAME ||
    password !== process.env.TEACHER_PASSWORD
  ) {
    throw new Error("User Not Found!");
  }

  // retrieve other data related to user if necessary
  return { name: username, id: uuidv4() };
};
