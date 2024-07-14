import { Injectable } from '@nestjs/common'
import { ISearchUserDto } from '@user/dto'

import { UserRepository } from '@user/repositories/implementations/user-repository'

@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: ISearchUserDto) {
    const { name, email } = params

    if (name) {
      return await this.userRepository.searchByName(name)
    }

    if (email) {
      return await this.userRepository.searchByEmail(email)
    }

    return await this.userRepository.findAll()
  }
}
