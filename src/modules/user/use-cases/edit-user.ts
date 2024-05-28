import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { IUserRepository } from '@user/repository/i-user-repository'
import { IEditUserDTO } from '@user/dto/i-edit-user-dto'
import { AppError } from '@/errors/app-error'

@injectable()
export class EditUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(props: IEditUserDTO) {
    if (props.email) {
      const emailAlreadyRegistered = await this.userRepository.findByEmail(
        props.email,
      )
      if (emailAlreadyRegistered && emailAlreadyRegistered.id !== props.id)
        throw new AppError('Email already registered', 400)
    }

    if (props.userName) {
      const userNameAlreadyTaken = await this.userRepository.findByUserName(
        props.userName,
      )
      if (userNameAlreadyTaken && userNameAlreadyTaken.id !== props.id)
        throw new AppError('Username already taken', 400)
    }

    const passwordHash = props.password ? await hash(props.password, 8) : null

    return this.userRepository.edit({
      password: passwordHash || props.password,
      ...props,
    })
  }
}
