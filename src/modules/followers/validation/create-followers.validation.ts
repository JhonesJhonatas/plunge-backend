import { IsString } from 'class-validator'

export class CreateFollowesValidation {
  @IsString()
  followingId: string
}
