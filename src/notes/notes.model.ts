import * as mongoose from "mongoose";

export const NoteSchema = new mongoose.Schema({
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
