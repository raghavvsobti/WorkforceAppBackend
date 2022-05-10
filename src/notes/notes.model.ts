import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User, UserSchema } from "../auth/auth.model";

export const NoteSchema = new mongoose.Schema({
  // constructor(@InjectModel("User") private userModel: mongoose.Model<User & mongoose.Document>){}

  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export interface Note extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
}

