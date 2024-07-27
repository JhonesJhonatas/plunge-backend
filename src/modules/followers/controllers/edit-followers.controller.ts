import { Body, Controller, Put } from '@nestjs/common'

import { EditFollowersService } from '@followers/services'
import { EditFollowesValidation } from '@followers/validation'

@Controller('/followers')
export class EditFollowersController {
  constructor(private readonly editFollowersService: EditFollowersService) {}

  @Put()
  async handle(@Body() params: EditFollowesValidation) {
    return await this.editFollowersService.execute(params)
  }
}
