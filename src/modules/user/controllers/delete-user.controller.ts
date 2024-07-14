import { Controller, Delete, Param } from '@nestjs/common'

import { User } from '@prisma/client'
import { DeleteUserService } from '@user/services/delete-user.service'

import { DeleteUserValidation } from '@user/validations'

@Controller('/user')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete()
  async handle(@Param() params: DeleteUserValidation): Promise<User> {
    return await this.deleteUserService.execute(params)
  }
}
