import { TaskService } from "./task.service";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getHello(): string;
    create(name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string): Promise<string>;
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
    getTask(taskId: string): Promise<{
        id: string;
        name: string;
        description: string;
        status: string;
        startDate: Date;
        endDate: Date;
        empName: string;
        workingDays: Date[];
    }>;
    updateTask(taskid: string, name: string, description: string, startDate: Date, endDate: Date, status: string, empName: string, workingDays: Date[]): Promise<any>;
    removeTask(taskId: string): Promise<any>;
    D: any;
}
