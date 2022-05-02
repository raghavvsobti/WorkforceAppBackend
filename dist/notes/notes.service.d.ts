import { Model, Document } from "mongoose";
import { User } from "src/auth/auth.model";
import { Note } from "./notes.model";
export declare class NotesService {
    private noteModel;
    private userModel;
    constructor(noteModel: Model<Note>, userModel: Model<User & Document>);
    getHello(): string;
    create(data: any): Promise<Note & {
        _id: any;
    }>;
    getAllNotes(userId: string): Promise<{}[]>;
    getSingleNote(noteId: string): Promise<{
        id: string;
        title: string;
        description: string;
    }>;
    updateNote(noteId: string, title: string, description: string): Promise<void>;
    deleteNote(userId: string, noteId: string): Promise<User & Document<any, any, any> & {
        _id: any;
    }>;
    private findNote;
}
