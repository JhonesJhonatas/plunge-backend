import { GetProfileDataService } from '@/modules/user/services'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

import { AppError } from '@common/errors'

let getProfileDataService: GetProfileDataService

describe('search-user-service', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    getProfileDataService = new GetProfileDataService(userRepository)
  })

  it('should not be able to get profile if nickName dosent exists', async () => {
    await expect(
      getProfileDataService.execute({
        nickName: 'unexist-nickname',
        userId: '123',
      }),
    ).rejects.toEqual(new AppError('User not found', 404))
  })

  it('should be able to get profile data by nickName', async () => {
    const user = await getProfileDataService.execute({
      nickName: 'userToTest',
      userId: '123',
    })

    expect(user).toHaveProperty('user')
    expect(user).toHaveProperty('posts')
    expect(user).toHaveProperty('follows')
  })
})
