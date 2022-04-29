import * as mongoose from "mongoose";
export declare const NoteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}, {}>;
export interface Note extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    user: mongoose.Schema.Types.ObjectId;
}
