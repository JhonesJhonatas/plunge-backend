import { Body, Controller, Post } from '@nestjs/common'

import { User } from '@prisma/client'

import { CreateUserService } from '@user/services/create-user.service'
import { CreateUserValidation } from '@user/validations'

@Controller('/user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async handle(@Body() params: CreateUserValidation): Promise<User> {
    return await this.createUserService.execute(params)
  }
}
