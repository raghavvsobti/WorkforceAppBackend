import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { User } from "src/auth/auth.model";
import { Note } from "./notes.model";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel("Note") private noteModel: Model<Note>,
    @InjectModel("User") private userModel: Model<User & Document>
  ) {}

  getHello(): string {
    return Date();
  }

  async create(data: any) {
    const user = await this.userModel.findById(data.user);
    const newNote = new this.noteModel(data);
    user.notes.push(newNote);
    console.log("user", user);
    console.log(newNote);
    await newNote.save();
    await user.save();
    return newNote;
  }

  async getAllNotes(userId: string) {
    const user = await this.userModel.findById(userId);
    const populatedUser = await user.populate("notes");
    return populatedUser.notes;
  }

  async getSingleNote(noteId: string) {
    const note = await this.findNote(noteId);
    return {
      id: note.id,
      title: note.title,
      description: note.description,
    };
  }

  async updateNote(noteId: string, title: string, description: string) {
    const updatedNote = await this.findNote(noteId);
    if (title) {
      updatedNote.title = title;
    }
    if (description) {
      updatedNote.description = description;
    }
    updatedNote.save();
  }

  async deleteNote(userId: string, noteId: string) {
    const user = await this.userModel.findById(userId);
    const usersNote = user.notes;
    const index = user.notes.indexOf(`${noteId}`);
    if (index > -1) {
      usersNote.splice(index, 1); // 2nd parameter means remove one item only
    }
    const result = await this.noteModel.deleteOne({ _id: noteId }).exec();
    if (!result.deletedCount) {
      throw new NotFoundException("Could not find note.");
    }
    return user.save();
  }

  private async findNote(id: string): Promise<Note> {
    let note;
    try {
      note = await this.noteModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not find note.");
    }
    if (!note) {
      throw new NotFoundException("Could not find note.");
    }
    return note;
  }
}
