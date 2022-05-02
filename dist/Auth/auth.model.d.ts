import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}, {}>;
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    notesId: string;
}
