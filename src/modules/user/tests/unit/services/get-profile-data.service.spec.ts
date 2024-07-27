import { AppError } from '@common/errors'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { GetProfileDataService } from '@user/services'

let getProfileDataService: GetProfileDataService

describe('get-profile-data-service', () => {
  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    getProfileDataService = new GetProfileDataService(userRepository)
  })

  it('should no be able to get profile if user does not exist', async () => {
    await expect(
      getProfileDataService.execute({
        nickName: 'asdasdasdasd',
      }),
    ).rejects.toEqual(new AppError('User Not Found', 404))
  })

  it('should be able to get profile if user exists', async () => {
    const userCreated = await getProfileDataService.execute({
      nickName: 'userInMemory',
    })

    expect(userCreated).toHaveProperty('id')
    expect(userCreated).toHaveProperty('name')
    expect(userCreated).toHaveProperty('nickName')
    expect(userCreated).toHaveProperty('email')
    expect(userCreated).toHaveProperty('avatarUrl')
    expect(userCreated).toHaveProperty('createdAt')
  })
})
