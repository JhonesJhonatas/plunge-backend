import { IsString } from 'class-validator'

export class EditFollowerValidation {
  @IsString()
  id: string

  @IsString()
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
}
