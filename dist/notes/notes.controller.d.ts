import { NotesService } from "./notes.service";
export declare class NotesController {
    private readonly noteService;
    constructor(noteService: NotesService);
    getHello(): string;
    create(title: string, description: string): Promise<string>;
    getAllNotes(): Promise<{
        id: string;
        title: string;
        description: string;
    }[]>;
    getNote(noteId: string): Promise<{
        id: string;
        title: string;
        description: string;
    }>;
    updateNote(noteid: string, title: string, description: string): Promise<any>;
    removeNote(noteId: string): Promise<any>;
}
