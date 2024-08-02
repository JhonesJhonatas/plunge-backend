import { Controller, Delete, Param } from '@nestjs/common'

import { DeleteFollowerService } from '@follower/services'
import { DeleteFollowerValidation } from '@follower/validation'

@Controller('/followers')
export class DeleteFollowerController {
  constructor(private readonly deleteFollowerService: DeleteFollowerService) {}

  @Delete(':id')
  async handle(@Param() { id }: DeleteFollowerValidation) {
    return await this.deleteFollowerService.execute({
      id,
    })
  }
}
