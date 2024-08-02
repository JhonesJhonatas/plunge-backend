import { Body, Controller, Post, Req } from '@nestjs/common'

import { CreateFollowerService } from '@follower/services'
import { CreateFollowerValidation } from '@follower/validation'

import { Request } from 'express'

@Controller('/follower')
export class CreateFollowerController {
  constructor(private readonly createFollowerService: CreateFollowerService) {}

  @Post()
  async handle(
    @Body() { followingId }: CreateFollowerValidation,
    @Req() request: Request,
  ) {
    const {
      user: { id },
    } = request

    return await this.createFollowerService.execute({
      followerId: id,
      followingId,
    })
  }
}
