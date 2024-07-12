import { Injectable } from '@nestjs/common'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { SearchUserValidation } from '@user/validations/'

@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: SearchUserValidation) {
    return await this.userRepository.search(params)
  }
}
