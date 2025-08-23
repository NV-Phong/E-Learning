import { connectDB } from "@/lib/mongoose";
import { User } from "@/schema/user";
import { NextResponse } from "next/server";

type RouteContext = {
   params: Promise<{
      id: string;
   }>;
};

export async function GET(req: Request, context: RouteContext) {
   await connectDB();
   const { id } = await context.params;

   const user = await User.findById(id);
   if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
   }
   return NextResponse.json(user);
}

export async function PUT(req: Request, context: RouteContext) {
   await connectDB();
   const { id } = await context.params;

   try {
      const body = await req.json();
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user);
   } catch {
      return NextResponse.json(
         { error: "Failed to update user" },
         { status: 500 }
      );
   }
}

export async function DELETE(req: Request, context: RouteContext) {
   await connectDB();
   const { id } = await context.params;

   try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "User deleted successfully" });
   } catch {
      return NextResponse.json(
         { error: "Failed to delete user" },
         { status: 500 }
      );
   }
}
