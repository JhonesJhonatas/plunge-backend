import { AppError } from '@/errors/app-error'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { AuthenticateUserUseCase } from '@user/use-cases/authenticate-user-use-case'

let authenticateUserUseCase: AuthenticateUserUseCase

describe('authenticate-user-use-case', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  })

  it('should not be able to authenticate user with incorrect email', async () => {
    const userData = {
      email: 'incorrectEmail@example.com',
      password: 'senha123',
    }

    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError('User not found!', 404),
    )
  })

  it('should not be able to authenticate user with incorrect password', async () => {
    const userData = {
      email: 'jhones.jhonatas@example.com',
      password: 'incorrectPassword',
    }

    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError('Password Incorrect', 401),
    )
  })

  it('should be able to authenticate user with correct credentials', async () => {
    const userData = {
      name: 'Auth Test',
      email: 'auth-test@example.com',
      password: 'senha123',
    }

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    })

    expect(authenticatedUser).toHaveProperty('token')
    expect(authenticatedUser.user.name).toBe(userData.name)
    expect(authenticatedUser.user.email).toBe(userData.email)
  })
})
