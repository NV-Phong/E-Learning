import { NextResponse } from "next/server";

export async function GET() {
   return NextResponse.json({
      message: "Hello, I'm Nguyen Van Phong",
   });
}
