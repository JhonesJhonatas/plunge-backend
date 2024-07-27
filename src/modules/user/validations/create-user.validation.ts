import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserValidation {
  @IsString()
  name: string

  @IsString()
  nickName: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  bio: string

  @IsOptional()
  @IsString()
  avatarUrl: string

  @MinLength(6)
  password: string
}
