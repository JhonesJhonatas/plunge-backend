import { IsBoolean, IsString } from 'class-validator'

export class RatePostValidation {
  @IsString()
  postId: string

  @IsBoolean()
  like: boolean
}
