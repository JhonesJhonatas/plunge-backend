import { IsString } from 'class-validator'

export class CreateFollowerValidation {
  @IsString()
  followingId: string
}
