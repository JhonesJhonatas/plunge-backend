import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'

import { FindAllUsersUseCase } from '@user/use-cases/find-all-users-use-case'

const userRepository = new InMemoryUserRepository()
const topicRepository = new InMemoryTopicRepository()

const findAllUsersUseCase = new FindAllUsersUseCase(
  userRepository,
  topicRepository,
)

describe('find-all-users-use-case', () => {
  it('should be able to find all users', async () => {
    const users = await findAllUsersUseCase.execute()

    expect(users).toBeInstanceOf(Array)
  })
})
