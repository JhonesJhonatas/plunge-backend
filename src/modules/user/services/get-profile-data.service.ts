import { Injectable } from '@nestjs/common'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { GetProfileDataValidation } from '@user/validations'

@Injectable()
export class GetProfileDataService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: GetProfileDataValidation) {
    const user = await this.userRepository.getProfileData(params.nickName)

    if (!user) throw new AppError('User Not Found', 404)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user

    return rest
  }
}
