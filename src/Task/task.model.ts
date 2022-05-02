import * as mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema(
  {
    color: { type: String, default: "green-200" },
    name: { type: String, required: true },
    empName: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    workingDays: { type: Array },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export interface Task extends mongoose.Document {
  id: string;
  color: string;
  name: string;
  empName: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  workingDays: Date[];
  user: mongoose.Schema.Types.ObjectId;
}
