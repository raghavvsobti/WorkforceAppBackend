// import { Schema } from "@nestjs/mongoose";
import { IsEmail, IsMongoId, IsString } from "class-validator";
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
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
  notesId: string;
}
