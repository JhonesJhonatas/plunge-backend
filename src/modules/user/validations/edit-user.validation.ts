import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class EditUserValidation {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  nickName: string

  @IsOptional()
  @IsString()
  bio: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  avatarUrl: string

  @IsOptional()
  @MinLength(6)
  password: string
}
