import { IsOptional, IsString } from 'class-validator'

export class CreatePostValidation {
  @IsString()
  content: string

  @IsOptional()
  @IsString()
  mediaUrl?: string

  @IsOptional()
  @IsString()
  userId: string
}
