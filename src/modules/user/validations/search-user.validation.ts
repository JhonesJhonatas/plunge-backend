import { IsEmail, IsOptional, IsString } from 'class-validator'

export class SearchUserValidation {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsEmail()
  email: string
}
