import { Injectable } from "@nestjs/common";
import { User } from "./auth.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Document } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<User & Document>,
    private jwtService: JwtService
  ) {}

  async create(data: any) {
    // const { name, password, email } = data;
    console.log(data);
    const newUser = new this.userModel(data);
    const result = await newUser.save();
    return result.id;
  }

  async findOne(condition: any) {
    return this.userModel.findOne(condition);
  }

  getHello(): string {
    return Date();
  }
}
