import { IsOptional, IsString } from 'class-validator'

export class SearchPostValidation {
  @IsOptional()
  @IsString()
  content?: string
}
