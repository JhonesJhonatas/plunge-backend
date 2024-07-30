import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class CreateUserValidation {
  @IsString()
  name: string

  @IsString()
  @Matches(/^@[a-z0-9]+$/, {
    message:
      'nickName must start with @, be lowercase, and contain no spaces or special characters',
  })
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
