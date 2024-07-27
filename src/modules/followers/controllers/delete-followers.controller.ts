import { Controller, Delete, Param, Req } from '@nestjs/common'

import { DeleteFollowersService } from '@followers/services'
import { CreateFollowesValidation } from '@followers/validation'
import { Request } from 'express'

@Controller('/followers')
export class DeleteFollowersController {
  constructor(
    private readonly deleteFollowersService: DeleteFollowersService,
  ) {}

  @Delete(':followedById/:followingId')
  async handle(
    @Param() { followingId }: CreateFollowesValidation,
    @Req() request: Request,
  ) {
    const {
      user: { id },
    } = request

    return await this.deleteFollowersService.execute({
      followedById: id,
      followingId,
    })
  }
}
