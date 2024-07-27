import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { CreateUserValidation } from '@user/validations'

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: CreateUserValidation) {
    const emailAlreadyRegistered = await this.userRepository.findByEmail(
      params.email,
    )

    if (emailAlreadyRegistered) {
      throw new AppError('Email already registered', 400)
    }

    const nickNameAlreadyRegistered = await this.userRepository.findByNickName(
      params.nickName,
    )

    if (nickNameAlreadyRegistered) {
      throw new AppError('NickName already registered', 400)
    }

    const passwordHash = await hash(params.password, 8)

    const { id, name, nickName, bio, email, createdAt } =
      await this.userRepository.create({
        ...params,
        password: passwordHash,
      })

    return {
      id,
      name,
      nickName,
      bio,
      email,
      createdAt,
    }
  }
}
