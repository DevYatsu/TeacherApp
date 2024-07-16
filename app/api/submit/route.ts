import { NextRequest, NextResponse } from "next/server";

type PostData = {
  username: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (
    !data["username"] ||
    typeof data["username"] !== "string" ||
    !data.username.trim() ||
    !data["password"] ||
    typeof data["password"] !== "string" ||
    !data.password.trim()
  ) {
    return NextResponse.json({ message: "Invalid post data" }, { status: 403 });
  }

  const credentials: PostData = data;

  return NextResponse.json({ message: "OK", ok: true }, { status: 200 });
}
