import { compare } from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'
import { ISignInDto } from '@auth/dto'

interface IResponse {
  user: {
    name: string
    email: string
  }
  accessToken: string
}

@Injectable()
export class SignInService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: ISignInDto): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401)
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email,
      password,
    })

    const tokenResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    }

    return tokenResponse
  }
}
