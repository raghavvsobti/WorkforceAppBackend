import { MiddlewareConsumer, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// import { TaskSchema } from "dist/task/task.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserSchema } from "./auth/auth.model";
import { AuthModule } from "./auth/auth.module";
import { MONGO_CONNECTION } from "./constants";
import { GetUserMiddleware } from "./middlewares/get-user.middleware";
import { NotesController } from "./notes/notes.controller";
import { NoteSchema } from "./notes/notes.model";
import { NotesModule } from "./notes/notes.module";
import { NotesService } from "./notes/notes.service";
import { TaskController } from "./Task/task.controller";
import { TaskSchema } from "./Task/task.model";
import { TaskModule } from "./Task/task.module";

@Module({
  imports: [
    TaskModule,
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: "Note", schema: NoteSchema }]),
    NotesModule,
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(NotesController, TaskController);
  }
}
