import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

import { AppError } from '@common/errors'
import { CreateUserService } from '@user/services'

let createUserService: CreateUserService

describe('create-user-service', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    createUserService = new CreateUserService(userRepository)

    await createUserService.execute({
      name: 'tester',
      email: 'tester@email.com',
      password: '123456',
      avatarUrl: null,
    })
  })

  it('should not be able to create a new user with an email that is already registered', async () => {
    const userToCreate = {
      name: 'tester',
      email: 'tester@email.com',
      password: '123456',
      avatarUrl: null,
    }

    await expect(createUserService.execute(userToCreate)).rejects.toEqual(
      new AppError('Email already registered', 400),
    )
  })

  it('should be able to create a new user with success', async () => {
    const userToCreate = {
      name: 'tester01',
      email: 'tester01@email.com',
      password: '123456',
      avatarUrl: null,
    }

    const createdUser = await createUserService.execute(userToCreate)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.email).toBe(userToCreate.email)
  })
})
