import { Body, Controller, Post } from '@nestjs/common'

import { CreateFollowersService } from '@followers/services'
import { CreateFollowesValidation } from '@followers/validation'

@Controller('/followers')
export class CreateFollowersController {
  constructor(
    private readonly createFollowersService: CreateFollowersService,
  ) {}

  @Post()
  async handle(@Body() params: CreateFollowesValidation) {
    return await this.createFollowersService.execute(params)
  }
}
