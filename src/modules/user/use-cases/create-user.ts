import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateUserDTO } from '@user/dto/i-create-user-dto'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(user: ICreateUserDTO) {
    const [userAlreadyRegistered, userNameAlreadyTaken] = await Promise.all([
      this.userRepository.findByEmail(user.email),
      this.userRepository.findByUserName(user.userName),
    ])

    if (userAlreadyRegistered) throw new Error('User already registered')

    if (userNameAlreadyTaken) throw new Error('Username already taken')

    const passwordHash = await hash(user.password, 8)

    return this.userRepository.create({
      ...user,
      password: passwordHash,
    })
  }
}
