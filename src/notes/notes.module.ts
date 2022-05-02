import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/auth/auth.model";
import { NotesController } from "./notes.controller";
import { NoteSchema } from "./notes.model";
import { NotesService } from "./notes.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Note", schema: NoteSchema }]),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
