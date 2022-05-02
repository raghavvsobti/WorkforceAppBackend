/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Task } from "./task.model";
import { Model } from "mongoose";
import { User } from "src/auth/auth.model";
export declare class TaskService {
    private taskModel;
    private userModel;
    constructor(taskModel: Model<Task>, userModel: Model<User & Document>);
    getHello(): string;
    create(data: any): Promise<Task & {
        _id: any;
    }>;
    getAllTasks(userId: string): Promise<{
        id: any;
        name: any;
        description: any;
        status: any;
        startDate: any;
        endDate: any;
        empName: any;
        workingDays: any;
        color: any;
    }[]>;
    getSingleTask(taskId: string): Promise<{
        id: string;
        name: string;
        description: string;
        status: string;
        startDate: Date;
        endDate: Date;
        empName: string;
        workingDays: Date[];
        color: string;
    }>;
    updateTask(taskId: string, name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string, workingDays: Date[], color: string): Promise<void>;
    deleteTask(userId: string, taskId: string): Promise<import("mongoose").Document<unknown, any, User & Document> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private findTask;
}
