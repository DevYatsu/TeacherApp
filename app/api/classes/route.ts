import { NextResponse } from "next/server";

export const GET = async (request: Request) => {};

export const POST = async (request: Request) => {
  const result = await request.json();

  console.log(result);

  return new NextResponse("Failed to create a new classroom drive", {
    status: 400,
  });
};
