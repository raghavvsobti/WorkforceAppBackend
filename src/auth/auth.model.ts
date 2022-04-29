// import { Schema } from "@nestjs/mongoose";
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

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  notes: [];
}
