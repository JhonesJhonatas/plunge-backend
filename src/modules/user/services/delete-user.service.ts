import { Injectable } from '@nestjs/common'

import { AppError } from '@common/errors'
import { IDeleteUserDto } from '@user/dto'
import { UserRepository } from '@user/repositories/implementations/user-repository'

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: IDeleteUserDto) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return await this.userRepository.delete(user)
  }
}
