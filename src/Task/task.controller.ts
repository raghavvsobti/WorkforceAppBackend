import { Param, Patch } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { Delete } from "@nestjs/common";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationGuard } from "../guards/authentication.guard";
import { TaskService } from "./task.service";
// import { getDatesInRange } from "src/Task/utils.js";

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate);

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date).toLocaleDateString());
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

function getFormat(today) {
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "-" + dd + "-" + yyyy;
  console.log(today);
}

// const d1 = new Date("2022-01-18");
// const d2 = new Date("2022-01-24");

console.log(getDatesInRange(new Date("2022-04-27"), new Date("2022-04-29")));

@Controller("task")
@UseGuards(AuthenticationGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getHello(): string {
    return this.taskService.getHello();
  }

  @Post("create")
  async create(
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("startDate") startDate: Date,
    @Body("endDate") endDate: Date,
    @Body("status") status: string,
    @Body("empName") empName: string,
    @Body("color") color: string
  ) {
    const workingDays = getDatesInRange(new Date(startDate), new Date(endDate));

    const task = await this.taskService.create({
      name,
      empName,
      description: description,
      status: status,
      startDate: startDate,
      endDate: endDate,
      workingDays: workingDays,
      color: color,
    });

    return task;
  }

  @Get("all")
  async getAllTasks() {
    const tasks = await this.taskService.getAllTasks();
    return tasks;
  }

  @Get(":id")
  getTask(@Param("id") taskId: string) {
    return this.taskService.getSingleTask(taskId);
  }

  @Patch(":id")
  async updateTask(
    @Param("id") taskid: string,
    @Body("name") name: string,
    @Body("description") description: string,
    @Body("startDate") startDate: Date,
    @Body("endDate") endDate: Date,
    @Body("status") status: string,
    @Body("empName") empName: string,
    @Body("color") color: string,
    workingDays: Date[]
  ) {
    await this.taskService.updateTask(
      taskid,
      name,
      description,
      startDate,
      endDate,
      status,
      empName,
      workingDays,
      color
    );
    return null;
  }

  @Delete(":id")
  async removeTask(@Param("id") taskId: string) {
    await this.taskService.deleteTask(taskId);
    return null;
  }
  D;
}
