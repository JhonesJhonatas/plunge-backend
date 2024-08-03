import { IsString } from 'class-validator'

export class DeleteFollowerValidation {
  @IsString()
  id: string
}
