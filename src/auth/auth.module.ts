import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./auth.model";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "src/constants";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
