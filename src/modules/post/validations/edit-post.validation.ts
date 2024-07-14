import { IsOptional, IsString } from 'class-validator'

export class EditPostValidation {
  @IsString()
  id: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  mediaUrl?: string
}
