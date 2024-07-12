import { Body, Controller, Put } from '@nestjs/common'

import { User } from '@prisma/client'

import { EditUserService } from '@user/services/edit-user.service'
import { EditUserValidation } from '@user/validations'

@Controller('/user')
export class EditUserController {
  constructor(private readonly editUserService: EditUserService) {}

  @Put()
  async handle(@Body() params: EditUserValidation): Promise<User> {
    return await this.editUserService.execute(params)
  }
}
