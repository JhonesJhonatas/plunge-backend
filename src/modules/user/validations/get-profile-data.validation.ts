import { IsString } from 'class-validator'

export class GetProfileDataValidation {
  @IsString()
  nickName: string
}
