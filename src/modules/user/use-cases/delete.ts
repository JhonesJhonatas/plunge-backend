import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'
import { AppError } from '@/errors/app-error'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)

    if (!user) throw new AppError('User not found', 404)

    return await this.userRepository.delete(id)
  }
}
