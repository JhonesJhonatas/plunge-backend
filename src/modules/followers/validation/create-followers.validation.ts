import { IsString } from 'class-validator'

export class CreateFollowesValidation {
  @IsString()
  followedById: string

  @IsString()
  followingId: string
}
