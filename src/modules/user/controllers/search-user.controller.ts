import { Controller, Get, Query } from '@nestjs/common'

import { SearchUserService } from '@user/services/search-user.service'
import { SearchUserValidation } from '@user/validations'

@Controller('/user')
export class SearchUserController {
  constructor(private readonly searchUserService: SearchUserService) {}

  @Get()
  async handle(@Query() params: SearchUserValidation) {
    return await this.searchUserService.execute(params)
  }
}
