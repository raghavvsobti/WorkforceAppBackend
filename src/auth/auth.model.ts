// import { Schema } from "@nestjs/mongoose";
import { IsEmail, IsMongoId, IsString } from "class-validator";
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    lowercase: true,
    enum: ["user", "superadmin", "admin"],
    default: "user",
  },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

export class User {
  @IsString()
  @IsMongoId()
  id: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  password: string;
  @IsString()
  @IsMongoId()
  notes: Array<{}>;
  role: string;
}
