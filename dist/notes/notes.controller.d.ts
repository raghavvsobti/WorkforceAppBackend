import { NotesService } from "./notes.service";
export declare class NotesController {
    private readonly noteService;
    constructor(noteService: NotesService);
    getHello(): string;
    create(title: string, description: string, userId: string): Promise<import("./notes.model").Note & {
        _id: any;
    }>;
    getAllNotes(userId: string): Promise<{}[]>;
    getNote(noteId: string): Promise<{
        id: string;
        title: string;
        description: string;
    }>;
    updateNote(noteid: string, title: string, description: string): Promise<any>;
    removeNote(noteId: string, userId: string): Promise<any>;
}
