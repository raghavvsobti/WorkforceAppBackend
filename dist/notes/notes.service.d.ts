import { Model } from "mongoose";
import { Note } from "./notes.model";
export declare class NotesService {
    private noteModel;
    constructor(noteModel: Model<Note>);
    getHello(): string;
    create(data: any): Promise<string>;
    getAllNotes(): Promise<{
        id: string;
        title: string;
        description: string;
    }[]>;
    getSingleNote(noteId: string): Promise<{
        id: string;
        title: string;
        description: string;
    }>;
    updateNote(noteId: string, title: string, description: string): Promise<void>;
    deleteNote(noteId: string): Promise<void>;
    private findNote;
}
