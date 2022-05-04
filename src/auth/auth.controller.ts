import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post("register")
  async register(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("role") role: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.authService.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    return user;
  }

  @Post("create-member")
  async createMember(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("role") role: string,
    @Body("createdBy") createdBy: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.authService.createMember({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      createdBy: createdBy,
    });

    return user;
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.authService.findOne({ email });

    console.log(user);
    if (!user) {
      console.log("email error!");
      throw new BadRequestException("Invalid Credentials");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.log(password, user.password);
      throw new BadRequestException("Password Error, check credentials!!");
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie("jwt", jwt, { httpOnly: true });
    return { message: "success", user, jwt };
  }

  @Get("user")
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies["jwt"];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOne({ id: data["id"] });
      const { name, email } = user;
      // const userData = { name, email, notes };
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Get(":userId/members")
  async getAllMembers(@Param("userId") userId: string) {
    const members = await this.authService.getAllMembers(userId);
    return members;
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");
    return { message: "Logout Success" };
  }
}
