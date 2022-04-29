import * as mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    empName: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    workingDays: { type: Array },
  },
  {
    timestamps: true,
  }
);

export interface Task extends mongoose.Document {
  id: string;
  name: string;
  empName: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  workingDays: Date[];
}
