import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { ISearchUserDto } from '@user/dto'

import { UserRepository } from '@user/repositories/implementations/user-repository'

@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) {}

  private removePasswordFromUsers(users: User[]) {
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        nickName: user.nickName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
      }
    })
  }

  async execute(params: ISearchUserDto) {
    const { name, email, nickName } = params

    let users: User[]

    if (name) users = await this.userRepository.searchByName(name)
    if (email) users = await this.userRepository.searchByEmail(email)
    if (nickName) users = await this.userRepository.searchByNickName(nickName)
    if (!name && !email && !nickName)
      users = await this.userRepository.findAll()

    return this.removePasswordFromUsers(users)
  }
}
