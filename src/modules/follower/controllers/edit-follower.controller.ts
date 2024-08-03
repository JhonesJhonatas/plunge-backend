import { Body, Controller, Put } from '@nestjs/common'

import { EditFollowerService } from '@follower/services'
import { EditFollowerValidation } from '@follower/validation'

@Controller('/follower')
export class EditFollowerController {
  constructor(private readonly editFollowerService: EditFollowerService) {}

  @Put()
  async handle(@Body() params: EditFollowerValidation) {
    return await this.editFollowerService.execute(params)
  }
}
