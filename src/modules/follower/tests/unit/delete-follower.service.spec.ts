import { InMemoryFollowerRepository } from '@follower/repositories/implementations/in-memory-follower-repository'

import { DeleteFollowerService } from '@follower/services'

let deleteFollowerService: DeleteFollowerService

describe('delete-follower-service', () => {
  beforeEach(async () => {
    const followerRepository = new InMemoryFollowerRepository()
    deleteFollowerService = new DeleteFollowerService(followerRepository)
  })

  it('should be able to delete follower with success', async () => {
    const follower = await deleteFollowerService.execute({
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
    })

    expect(follower).toHaveProperty('id')
    expect(follower).toHaveProperty('followerId')
    expect(follower).toHaveProperty('followingId')
    expect(follower).toHaveProperty('createdAt')
    expect(follower).toHaveProperty('updatedAt')
  })
})
