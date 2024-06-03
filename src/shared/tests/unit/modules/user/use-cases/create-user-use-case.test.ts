import { AppError } from '@/errors/app-error'

import { CreateUserUseCase } from '@user/use-cases/create-user-use-case'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'

import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'

const userRepository = new InMemoryUserRepository()
const topicRepository = new InMemoryTopicRepository()

const createUserUseCase = new CreateUserUseCase(userRepository, topicRepository)

describe('create-user-use-case', () => {
  it('should be able to create a user with complete data', async () => {
    const userToCreate = {
      name: 'Tester',
      userName: 'tester123',
      email: 'tester@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    const createdUser = await createUserUseCase.execute(userToCreate)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.userName).toBe(userToCreate.userName)
    expect(createdUser.email).toBe(userToCreate.email)
    expect(createdUser).toHaveProperty('password')
    expect(createdUser).toHaveProperty('birthDate')
    expect(createdUser.avatarUrl).toBe(userToCreate.avatarUrl)
    expect(createdUser.coverUrl).toBe(userToCreate.coverUrl)
    expect(createdUser.topics).toHaveLength(1)
  })

  it('should be able to create a user with only required data', async () => {
    const userToCreate = {
      name: 'Tester 2',
      userName: 'tester2',
      email: 'tester2@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    const createdUser = await createUserUseCase.execute(userToCreate)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser.name).toBe(userToCreate.name)
    expect(createdUser.userName).toBe(userToCreate.userName)
    expect(createdUser.email).toBe(userToCreate.email)
    expect(createdUser).toHaveProperty('password')
    expect(createdUser).toHaveProperty('birthDate')
  })

  it('should not be able to create a user with an already registered email', async () => {
    const userToCreate = {
      name: 'Jhones Jhonatas',
      userName: 'jhonesjhonatas',
      email: 'jhones.jhonatas@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    await expect(createUserUseCase.execute(userToCreate)).rejects.toEqual(
      new AppError('User already registered', 400),
    )
  })

  it('should not be able to create a user with an already taken username', async () => {
    const userToCreate = {
      name: 'Jhones Jhonatas',
      userName: 'jhonesjhonatas',
      email: 'jhones.test@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    await expect(createUserUseCase.execute(userToCreate)).rejects.toEqual(
      new AppError('Username already taken', 400),
    )
  })

  it('should not be able to create a user without topics', async () => {
    const userToCreate = {
      name: 'Tester 3',
      userName: 'tester3',
      email: 'tester3@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      topics: [],
    }

    await expect(createUserUseCase.execute(userToCreate)).rejects.toEqual(
      new AppError('At lest one topic is required', 400),
    )
  })

  it('should not be able to create a user with a non-existent topic', async () => {
    const userToCreate = {
      name: 'Tester 4',
      userName: 'tester4',
      email: 'tester4@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      topics: ['non-existent-topic'],
    }

    await expect(createUserUseCase.execute(userToCreate)).rejects.toEqual(
      new AppError(`Topic non-existent-topic does not exist`, 400),
    )
  })
})
