import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsEmail()
  //   @MinLength(4)
  //   @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(8, { message: "Password is too short (8 characters min)" })
  @MaxLength(20, { message: "Password is too long (20 characters max)" })
  password: string;
}
