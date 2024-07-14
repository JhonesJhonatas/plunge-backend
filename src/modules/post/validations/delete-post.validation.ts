import { IsString } from 'class-validator'

export class DeletePostValidation {
  @IsString()
  id: string
}
