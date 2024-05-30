import { InMemoryUserRepository } from '@/modules/user/repository/implementations/in-memory-user-repository'
import { FindAllUsersUseCase } from '@/modules/user/use-cases/find-all-users-use-case'

const userRepository = new InMemoryUserRepository()
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository)

describe('find-all-users-use-case', () => {
  it('should be able to find all users', async () => {
    const users = await findAllUsersUseCase.execute()

    expect(users).toBeInstanceOf(Array)
  })
})
