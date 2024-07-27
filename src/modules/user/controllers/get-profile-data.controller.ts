import { Controller, Get, Query } from '@nestjs/common'

import { GetProfileDataService } from '@user/services'

import { GetProfileDataValidation } from '@user/validations'

@Controller('/user/get-profile-data')
export class GetProfileDataController {
  constructor(private readonly getProfileDataService: GetProfileDataService) {}

  @Get()
  async handle(@Query() params: GetProfileDataValidation) {
    return await this.getProfileDataService.execute(params)
  }
}
