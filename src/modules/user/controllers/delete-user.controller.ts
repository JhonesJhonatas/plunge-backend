import { Controller, Delete, Param } from '@nestjs/common'

import { DeleteUserService } from '@user/services/delete-user.service'

import { DeleteUserValidation } from '@user/validations'

@Controller('/user')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  async handle(@Param() params: DeleteUserValidation) {
    return await this.deleteUserService.execute(params)
  }
}
