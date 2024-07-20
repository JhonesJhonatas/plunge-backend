import { AppError } from '@common/errors'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { DeleteUserService } from '@user/services'

let deleteUserService: DeleteUserService

describe('delete-user-service', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    deleteUserService = new DeleteUserService(userRepository)
  })

  it('should not be able to delete a user that does not exist', async () => {
    await expect(
      deleteUserService.execute({ id: 'unexist-id' }),
    ).rejects.toEqual(new AppError('User not found', 404))
  })

  it('should be able to delete a user with success', async () => {
    const deletedUser = await deleteUserService.execute({
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
    })

    expect(deletedUser.id).toEqual('42a50108-3d20-4f4e-9565-20b4945c21da')
    expect(deletedUser.name).toEqual('User In Memory')
    expect(deletedUser.email).toEqual('userinmemory@email.com')
    expect(deletedUser).toHaveProperty('createdAt')
  })
})
