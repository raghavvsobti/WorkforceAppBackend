import { User } from "./auth.model";
import { Model, Document } from "mongoose";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User & Document>, jwtService: JwtService);
    create(data: any): Promise<any>;
    findOne(condition: any): Promise<User & Document<any, any, any> & {
        _id: any;
    }>;
    createMember(data: any): Promise<User & Document<any, any, any> & {
        _id: any;
    }>;
    getAllMembers(userId: string): Promise<{}[]>;
}
