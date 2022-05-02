import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/auth/auth.model";
import { TaskController } from "./task.controller";
import { TaskSchema } from "./task.model";
import { TaskService } from "./task.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
