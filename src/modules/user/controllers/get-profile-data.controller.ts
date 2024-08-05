import { Controller, Get, Query, Req } from '@nestjs/common'

import { GetProfileDataService } from '@user/services'

import { GetProfileDataValidation } from '@user/validations'
import { Request } from 'express'

@Controller('/user/get-profile-data')
export class GetProfileDataController {
  constructor(private readonly getProfileDataService: GetProfileDataService) {}

  @Get()
  async handle(
    @Query() { nickName }: GetProfileDataValidation,
    @Req() request: Request,
  ) {
    const { id } = request.user

    return await this.getProfileDataService.execute({ nickName, userId: id })
  }
}
