import { User } from "./auth.model";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    create(data: any): Promise<string>;
    findOne(condition: any): Promise<User & {
        _id: any;
    }>;
    getHello(): string;
}
