import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(28)
  password: string;

  @IsString()
  @IsOptional()
  bio?:string;

  @IsEmail()
  @IsString()
  @MinLength(8)
  @MaxLength(28)
  email:string;

}