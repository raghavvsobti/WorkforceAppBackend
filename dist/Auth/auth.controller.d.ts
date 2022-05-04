/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(name: string, email: string, password: string, role: string): Promise<any>;
    createMember(name: string, email: string, password: string, role: string, createdBy: string): Promise<import("./auth.model").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    login(email: string, password: string, response: Response): Promise<{
        message: string;
        user: import("./auth.model").User & import("mongoose").Document<any, any, any> & {
            _id: any;
        };
        jwt: string;
    }>;
    user(request: Request): Promise<import("./auth.model").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    getAllMembers(userId: string): Promise<{}[]>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
