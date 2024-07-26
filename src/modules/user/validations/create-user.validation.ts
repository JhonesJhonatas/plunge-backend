import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserValidation {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  avatarUrl: string

  @MinLength(6)
  password: string
}
