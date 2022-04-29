import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    getHello(): string;
    register(name: string, email: string, password: string): Promise<string>;
    login(email: string, password: string, response: Response): Promise<{
        message: string;
        user: import("./auth.model").User & {
            _id: any;
        };
        jwt: string;
    }>;
    user(request: Request): Promise<import("./auth.model").User & {
        _id: any;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
