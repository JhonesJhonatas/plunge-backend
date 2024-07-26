import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { EditUserValidation } from '@user/validations'

@Injectable()
export class EditUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: EditUserValidation) {
    const user = await this.userRepository.findById(params.id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const updateData = {
      id: params.id,
    }

    if (!params.email && !params.name && !params.password) {
      throw new AppError('You must provide at least one field to update', 400)
    }

    if (params.email) {
      const userAlreadyExists = await this.userRepository.findByEmail(
        params.email,
      )

      if (userAlreadyExists && userAlreadyExists.email !== user.email) {
        throw new AppError('Email already registered', 400)
      }

      Object.assign(updateData, { email: params.email })
    }

    if (params.name) {
      Object.assign(updateData, { name: params.name })
    }

    if (params.avatarUrl) {
      Object.assign(updateData, { avatarUrl: params.avatarUrl })
    }

    if (params.password) {
      const passwordHash = await hash(params.password, 8)

      Object.assign(updateData, { password: passwordHash })
    }

    const { id, name, email, createdAt, avatarUrl } =
      await this.userRepository.edit(updateData)

    return {
      id,
      name,
      email,
      createdAt,
      avatarUrl,
    }
  }
}
