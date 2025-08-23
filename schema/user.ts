import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Name is required"],
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      },
   },
   { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
