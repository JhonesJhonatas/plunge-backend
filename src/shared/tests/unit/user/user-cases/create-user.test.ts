import { CreateUserUseCase } from '@user/use-cases/create-user'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'

const userRepository = new InMemoryUserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)

describe('create-user-use-case', () => {
  it('should be able to create a user', async () => {
    const userToCreate = {
      name: 'Jhones Jhonatas',
      userName: 'jhonesjhonatas',
      email: 'jhones.jhonatas@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
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
  })

  // it('should not be able to create a topic with the same title', async () => {
  //   const topicToCreate = {
  //     title: 'Tecnologia',
  //   }

  //   await expect(createTopicUseCase.execute(topicToCreate)).rejects.toEqual(
  //     new AppError('Topic already exists', 400),
  //   )
  // })
})
