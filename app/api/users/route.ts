import { connectDB } from "@/lib/mongoose";
import { User } from "@/schema/user";
import { NextResponse } from "next/server";

export async function GET() {
   await connectDB();
   const users = await User.find({});
   return NextResponse.json(users);
}

export async function POST(req: Request) {
   try {
      await connectDB();
      const body = await req.json();
      const user = new User(body);
      await user.save();
      return NextResponse.json(user, { status: 201 });
   } catch (err) {
      if (
         err &&
         typeof err === "object" &&
         "code" in err &&
         (err as { code?: number }).code === 11000
      ) {
         return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 },
         );
      }
      return NextResponse.json(
         { error: "Failed to create user" },
         { status: 500 },
      );
   }
}
