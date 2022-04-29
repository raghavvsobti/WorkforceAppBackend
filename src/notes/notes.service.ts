import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note } from "./notes.model";

@Injectable()
export class NotesService {
  constructor(@InjectModel("Note") private noteModel: Model<Note>) {}

  getHello(): string {
    return Date();
  }

  async create(data: any) {
    const newNote = new this.noteModel(data);
    const result = await newNote.save();
    return result.id;
  }

  async getAllNotes() {
    const notes = await this.noteModel.find().exec();
    return notes.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
    }));
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

  async deleteNote(noteId: string) {
    const result = await this.noteModel.deleteOne({ _id: noteId }).exec();
    if (!result.deletedCount) {
      throw new NotFoundException("Could not find note.");
    }
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
