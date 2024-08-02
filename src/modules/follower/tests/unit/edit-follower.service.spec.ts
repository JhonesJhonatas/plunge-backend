import { InMemoryFollowerRepository } from '@follower/repositories/implementations/in-memory-follower-repository'

import { EditFollowerService } from '@follower/services'

let editFollowerService: EditFollowerService

describe('edit-follower-service', () => {
  beforeEach(async () => {
    const followerRepository = new InMemoryFollowerRepository()
    editFollowerService = new EditFollowerService(followerRepository)
  })

  it('should be able to edit follower with success', async () => {
    const follower = await editFollowerService.execute({
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      status: 'ACCEPTED',
    })

    expect(follower).toHaveProperty('id')
    expect(follower).toHaveProperty('followerId')
    expect(follower).toHaveProperty('followingId')
    expect(follower).toHaveProperty('createdAt')
    expect(follower).toHaveProperty('updatedAt')
  })
})
