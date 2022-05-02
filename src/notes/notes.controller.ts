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
import { AuthenticationGuard } from "../guards/authentication.guard";
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
    @Body("description") description: string,
    @Body("userId") userId: string
  ) {
    const note = await this.noteService.create({
      title,
      description: description,
      user: userId,
    });

    return note;
  }

  @Get("all/:userId")
  async getAllNotes(@Param("userId") userId: string)
  {
    const notes = await this.noteService.getAllNotes(userId);
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

  @Delete(":userId/:id")
  async removeNote(
    @Param("id") noteId: string,
    @Param("userId") userId: string
  ) {
    await this.noteService.deleteNote(userId, noteId);
    return null;
  }
}
