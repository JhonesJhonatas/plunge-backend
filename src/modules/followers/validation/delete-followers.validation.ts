import { IsString } from 'class-validator'

export class DeleteFollowesValidation {
  @IsString()
  followedById: string

  @IsString()
  followingId: string
}
