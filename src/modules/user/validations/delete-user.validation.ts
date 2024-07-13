import { IsString } from 'class-validator'

export class DeleteUserValidation {
  @IsString()
  id: string
}
