import { Body, Controller, Post, Req } from '@nestjs/common'

import { CreateFollowersService } from '@followers/services'
import { CreateFollowesValidation } from '@followers/validation'
import { Request } from 'express'

@Controller('/followers')
export class CreateFollowersController {
  constructor(
    private readonly createFollowersService: CreateFollowersService,
  ) {}

  @Post()
  async handle(
    @Body() { followingId }: CreateFollowesValidation,
    @Req() request: Request,
  ) {
    const followedById = request.user.id

    return await this.createFollowersService.execute({
      followedById,
      followingId,
    })
  }
}
