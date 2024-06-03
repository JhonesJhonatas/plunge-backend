import { AppError } from '@/errors/app-error'
import { InMemoryTopicRepository } from '@/modules/topic/repository/implementations/in-memory-topic-repository'
import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { CreateUserUseCase } from '@user/use-cases/create-user-use-case'
import { DeleteUserUseCase } from '@user/use-cases/delete-user-use-case'

const userRepository = new InMemoryUserRepository()
const topicRepository = new InMemoryTopicRepository()

const createUserUseCase = new CreateUserUseCase(userRepository, topicRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)

describe('delete-user-use-case', () => {
  it('should be able to delete a user', async () => {
    const createdUser = await createUserUseCase.execute({
      name: 'Blitz Wolf',
      userName: 'usertodelete',
      email: 'userToDelete@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24T00:00:00.000Z'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    })

    const deletedUser = await deleteUserUseCase.execute(createdUser.id)

    expect(deletedUser.name).toEqual(createdUser.name)
    expect(deletedUser.userName).toEqual(createdUser.userName)
    expect(deletedUser.email).toEqual(createdUser.email)
  })

  it('should not be able to delete user with unexist id', async () => {
    await expect(deleteUserUseCase.execute('123123123')).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })
})
