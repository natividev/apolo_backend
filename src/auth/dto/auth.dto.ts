import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  userName: string

  @IsString()
  @IsNotEmpty()
  password: string
}