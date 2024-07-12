import { Controller, Get, Param } from '@nestjs/common'

import { User } from '@prisma/client'

import { SearchUserService } from '@user/services/search-user.service'
import { SearchUserValidation } from '@user/validations'

@Controller('/user')
export class SearchUserController {
  constructor(private readonly searchUserService: SearchUserService) {}

  @Get()
  async handle(@Param() params: SearchUserValidation): Promise<User[]> {
    return await this.searchUserService.execute(params)
  }
}
