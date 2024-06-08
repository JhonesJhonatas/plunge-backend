import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { IUserRepository } from '@user/repository/i-user-repository'
import { AppError } from '@/errors/app-error'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found!', 404)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Password Incorrect', 401)
    }

    const todayDate = new Date()

    todayDate.setHours(0, 0, 0, 0)

    const token = sign({}, '10ie1jihasudhasuhd12312easda', {
      subject: user.id,
      expiresIn: '1d',
    })

    const tokenResponse: IResponse = {
      user: {
        name: user.name,
        email,
      },
      token,
    }

    return tokenResponse
  }
}
