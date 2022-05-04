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

  async createMember(data: any) {
    // const { name, password, email } = data;
    console.log(data);
    const newUser = new this.userModel(data);
    const user = await this.userModel.findById(data.createdBy);
    user.members.push(newUser);
    console.log("user", user);
    console.log(newUser);
    await newUser.save();
    await user.save();
    return newUser;
  }

  async getAllMembers(userId: string) {
    const user = await this.userModel.findById(userId);
    const populatedUser = await user.populate("members");
    return populatedUser.members;
  }
}
