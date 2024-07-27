import { IsOptional, IsString } from 'class-validator'

export class SearchUserValidation {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  email: string

  @IsOptional()
  @IsString()
  nickName: string
}
