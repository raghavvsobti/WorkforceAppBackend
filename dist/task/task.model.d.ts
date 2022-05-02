import * as mongoose from "mongoose";
export declare const TaskSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}, {}>;
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
}
