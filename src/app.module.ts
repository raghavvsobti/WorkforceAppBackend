import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// import { TaskSchema } from "dist/task/task.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserSchema } from "./auth/auth.model";
import { AuthModule } from "./auth/auth.module";
import { NotesController } from './notes/notes.controller';
import { NoteSchema } from "./notes/notes.model";
import { NotesModule } from './notes/notes.module';
import { NotesService } from './notes/notes.service';
import { TaskSchema } from "./Task/task.model";
import { TaskModule } from "./Task/task.module";

@Module({
  imports: [
    TaskModule,
    AuthModule,
    MongooseModule.forRoot(
      "mongodb+srv://raghav:password1234@cluster0.zw0t1.mongodb.net/nestAPi?retryWrites=true&w=majority"
    ),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: "Note", schema: NoteSchema }]),
    NotesModule,
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
