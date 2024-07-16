import { login } from "@/lib/login";
import { NextRequest, NextResponse } from "next/server";

type PostData = {
  username: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (
      !data["username"] ||
      typeof data["username"] !== "string" ||
      !data.username.trim() ||
      !data["password"] ||
      typeof data["password"] !== "string" ||
      !data.password.trim()
    ) {
      return NextResponse.json(
        { message: "Invalid post data", ok: false },
        { status: 403 }
      );
    }

    const credentials: PostData = data;

    const user = await login(credentials.username, credentials.password);

    if (!user) {
    }

    if (
      credentials.username !== process.env.TEACHER_USERNAME ||
      credentials.password !== process.env.TEACHER_PASSWORD
    ) {
      return NextResponse.json(
        { message: "Invalid username or password", ok: false },
        { status: 403 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error, ok: false }, { status: 403 });
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}
