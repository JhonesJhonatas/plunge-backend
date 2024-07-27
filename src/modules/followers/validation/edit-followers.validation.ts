import { IsString } from 'class-validator'

export class EditFollowesValidation {
  @IsString()
  followedById: string

  @IsString()
  followingId: string

  @IsString()
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
}
