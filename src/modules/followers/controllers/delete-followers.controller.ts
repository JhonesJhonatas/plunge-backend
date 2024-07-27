import { Controller, Delete, Param } from '@nestjs/common'

import { DeleteFollowersService } from '@followers/services'
import { CreateFollowesValidation } from '@followers/validation'

@Controller('/followers')
export class DeleteFollowersController {
  constructor(
    private readonly deleteFollowersService: DeleteFollowersService,
  ) {}

  @Delete(':followedById/:followingId')
  async handle(
    @Param() { followedById, followingId }: CreateFollowesValidation,
  ) {
    return await this.deleteFollowersService.execute({
      followedById,
      followingId,
    })
  }
}
