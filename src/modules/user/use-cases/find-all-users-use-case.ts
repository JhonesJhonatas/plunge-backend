import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute() {
    return await this.userRepository.findAll()
  }
}
