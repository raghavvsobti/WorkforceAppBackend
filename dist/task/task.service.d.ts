import { Task } from "./task.model";
import { Model } from "mongoose";
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    getHello(): string;
    create(data: any): Promise<string>;
    getAllTasks(): Promise<{
        id: string;
        name: string;
        description: string;
        status: string;
        startDate: string;
        endDate: string;
        empName: string;
        workingDays: Date[];
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
    }>;
    updateTask(taskId: string, name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string, workingDays: Date[]): Promise<void>;
    deleteTask(taskId: string): Promise<void>;
    private findTask;
}
