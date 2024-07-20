import { AppError } from '@common/errors'
import { JwtService } from '@nestjs/jwt'

import { SignInService } from '@auth/services'

import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

let signInService: SignInService

describe('sign-in-service', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    const jwtService = new JwtService({
      secret: 'asfgshdgfjhdsfwt23423668urfghasdf243rghs',
    })

    signInService = new SignInService(userRepository, jwtService)
  })

  it('should not be able to sign in with unexistent email', async () => {
    const signInData = {
      email: 'unexist-email@email.com',
      password: '123456',
    }

    await expect(signInService.signIn(signInData)).rejects.toEqual(
      new AppError('Email or password incorrect', 401),
    )
  })

  it('should not be able to sign in with incorrect password', async () => {
    const signInData = {
      email: 'userinmemory@email.com',
      password: '1234567',
    }

    await expect(signInService.signIn(signInData)).rejects.toEqual(
      new AppError('Email or password incorrect', 401),
    )
  })

  it('should be able to sign in with correct credentials', async () => {
    const signInData = {
      email: 'usertotestauth@email.com',
      password: '123456',
    }

    const signInResponse = await signInService.signIn(signInData)

    expect(signInResponse).toHaveProperty('accessToken')
    expect(signInResponse).toHaveProperty('user')
  })
})
