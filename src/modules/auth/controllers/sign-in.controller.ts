import { Body, Controller, Post } from '@nestjs/common'

import { SignInService } from '@auth/services'
import { SignInValidation } from '@auth/validations'
import { Public } from '@common/constants'

interface IResponse {
  user: {
    name: string
    email: string
  }
  accessToken: string
}

@Controller('auth')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Public()
  @Post('sign-in')
  async handle(@Body() params: SignInValidation): Promise<IResponse> {
    return await this.signInService.signIn(params)
  }
}
