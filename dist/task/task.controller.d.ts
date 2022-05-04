import { TaskService } from "./task.service";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getHello(): string;
    create(name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string, color: string, userId: string): Promise<import("./task.model").Task & {
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
    getTask(taskId: string): Promise<{
        id: string;
        name: string;
        description: string;
        status: string;
        startDate: Date;
        endDate: Date;
        empName: string[];
        workingDays: Date[];
        color: string;
    }>;
    updateTask(taskid: string, name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string[], color: string, workingDays: Date[]): Promise<any>;
    removeTask(taskId: string, userId: string): Promise<any>;
}
