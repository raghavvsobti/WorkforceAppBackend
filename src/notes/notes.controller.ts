import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthenticationGuard } from "dist/guards/authentication.guard";
import { NotesService } from "./notes.service";

@Controller("note")
@UseGuards(AuthenticationGuard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  getHello(): string {
    return this.noteService.getHello();
  }

  @Post("create")
  async create(
    @Body("title") title: string,
    @Body("description") description: string
  ) {
    const note = await this.noteService.create({
      title,
      description: description,
    });

    return note;
  }

  @Get("all")
  async getAllNotes() {
    const notes = await this.noteService.getAllNotes();
    return notes;
  }

  @Get(":id")
  getNote(@Param("id") noteId: string) {
    return this.noteService.getSingleNote(noteId);
  }

  @Patch(":id")
  async updateNote(
    @Param("id") noteid: string,
    @Body("title") title: string,
    @Body("description") description: string
  ) {
    await this.noteService.updateNote(noteid, title, description);
    return null;
  }

  @Delete(":id")
  async removeNote(@Param("id") noteId: string) {
    await this.noteService.deleteNote(noteId);
    return null;
  }
}
