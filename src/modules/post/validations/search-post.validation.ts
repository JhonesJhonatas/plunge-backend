import { IsString } from 'class-validator'

export class SearchPostValidation {
  @IsString()
  content?: string
}
