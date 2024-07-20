import { Injectable } from '@nestjs/common'

import { AppError } from '@common/errors'
import { IDeleteUserDto } from '@user/dto'
import { UserRepository } from '@user/repositories/implementations/user-repository'

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: IDeleteUserDto) {
    const user = await this.userRepository.findById(params.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const { id, name, email, createdAt } =
      await this.userRepository.delete(user)

    return {
      id,
      name,
      email,
      createdAt,
    }
  }
}
