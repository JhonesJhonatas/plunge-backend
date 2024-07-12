import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

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

      if (userAlreadyExists) {
        throw new AppError('Email already registered', 400)
      }

      Object.assign(updateData, { email: params.email })
    }

    if (params.name) {
      Object.assign(updateData, { name: params.name })
    }

    if (params.password) {
      const passwordHash = await hash(params.password, 8)

      Object.assign(updateData, { password: passwordHash })
    }

    return await this.userRepository.create(updateData as EditUserValidation)
  }
}
