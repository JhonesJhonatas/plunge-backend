import { Injectable } from '@nestjs/common'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { SearchUserValidation } from '@user/validations/'

@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: SearchUserValidation) {
    const { name, email } = params

    if (name) {
      return await this.userRepository.searchByName(name)
    }

    if (email) {
      return await this.userRepository.searchByEmail(email)
    }
  }
}
