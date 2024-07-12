import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserValidation {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @MinLength(6)
  password: string
}
