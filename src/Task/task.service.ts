import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./task.model";
import { Model } from "mongoose";
import { User } from "src/auth/auth.model";

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate);

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date).toLocaleDateString());
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectModel("Task") private taskModel: Model<Task>,
    @InjectModel("User") private userModel: Model<User & Document>
  ) {}

  getHello(): string {
    return Date();
  }

  async create(data: any) {
    const user = await this.userModel.findById(data.user);
    console.log("user", user);
    console.log(data);
    const newTask = new this.taskModel(data);
    user.tasks.push(newTask);
    console.log("user", user);
    console.log(newTask);
    await newTask.save();
    await user.save();
    return newTask;
  }

  async getAllTasks(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (user.role === "superadmin") {
      const tasks = await this.taskModel.find().exec();
      return tasks.map((task) => ({
        id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        startDate: task.startDate.toLocaleDateString(),
        endDate: task.endDate.toLocaleDateString(),
        empName: task.empName,
        workingDays: task.workingDays,
        color: task.color,
      }));
    } else {
      const populatedUser = await user.populate("tasks");
      return populatedUser.tasks.map((task: any) => ({
        id: task._id,
        name: task.name,
        description: task.description,
        status: task.status,
        startDate: task.startDate.toLocaleDateString(),
        endDate: task.endDate.toLocaleDateString(),
        empName: task.empName,
        workingDays: task.workingDays,
        color: task.color,
      }));
    }
  }

  async getSingleTask(taskId: string) {
    const task = await this.findTask(taskId);
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      status: task.status,
      startDate: task.startDate,
      endDate: task.endDate,
      empName: task.empName,
      workingDays: task.workingDays,
      color: task.color,
    };
  }

  async updateTask(
    taskId: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: string,
    empName: string[],
    workingDays: Date[],
    color: string
  ) {
    console.log(startDate, endDate, workingDays);
    const updatedTask = await this.findTask(taskId);
    if (name) {
      updatedTask.name = name;
    }
    if (description) {
      updatedTask.description = description;
    }

    if (startDate) {
      updatedTask.startDate = startDate;
      updatedTask.workingDays = getDatesInRange(
        new Date(startDate),
        new Date(updatedTask.endDate)
      );
    }
    if (endDate) {
      updatedTask.endDate = endDate;
      updatedTask.workingDays = getDatesInRange(
        new Date(updatedTask.startDate),
        new Date(endDate)
      );
    }
    if (status) {
      updatedTask.status = status;
    }
    if (empName) {
      updatedTask.empName = empName;
    }
    if (color) {
      updatedTask.color = color;
    }

    console.log(updatedTask.workingDays);

    updatedTask.save();
  }

  async deleteTask(userId: string, taskId: string) {
    // const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    // if (!result.deletedCount) {
    //   throw new NotFoundException("Could not find task.");
    // }

    const user = await this.userModel.findById(userId);
    const usersTask = user.tasks;
    const index = user.tasks.indexOf(`${taskId}`);
    if (index > -1) {
      usersTask.splice(index, 1); // 2nd parameter means remove one item only
    }
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    if (!result.deletedCount) {
      throw new NotFoundException("Could not find task.");
    }
    return user.save();
  }

  private async findTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not find task.");
    }
    if (!task) {
      throw new NotFoundException("Could not find task.");
    }
    return task;
  }
}
