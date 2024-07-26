import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { SearchUserService } from '@user/services/search-user.service'

let searchUserService: SearchUserService

describe('search-user-service', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    searchUserService = new SearchUserService(userRepository)
  })

  it('should be return a empity array if no have users', async () => {
    const users = await searchUserService.execute({
      email: null,
      name: 'maria',
    })

    expect(users).toEqual([])
  })

  it('should be able to search for a user by email', async () => {
    const users = await searchUserService.execute({
      email: 'userinmemory',
      name: null,
    })

    users.forEach((user) => {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('avatarUrl')
      expect(user).toHaveProperty('createdAt')
    })
  })

  it('should be able to search for a user by name', async () => {
    const users = await searchUserService.execute({
      email: null,
      name: 'test',
    })

    users.forEach((user) => {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('avatarUrl')
      expect(user).toHaveProperty('createdAt')
    })
  })

  it('shoudl be able to search users without any field', async () => {
    const users = await searchUserService.execute({
      email: null,
      name: null,
    })

    users.forEach((user) => {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('avatarUrl')
      expect(user).toHaveProperty('createdAt')
    })
  })
})
