import { InMemoryFollowerRepository } from '@follower/repositories/implementations/in-memory-follower-repository'

import { CreateFollowerService } from '@follower/services'

let createFollowerService: CreateFollowerService

describe('create-follower-service', () => {
  beforeEach(async () => {
    const followerRepository = new InMemoryFollowerRepository()
    createFollowerService = new CreateFollowerService(followerRepository)
  })

  it('should be able to create a new follower with success', async () => {
    const follower = await createFollowerService.execute({
      followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
    })

    expect(follower).toHaveProperty('id')
    expect(follower).toHaveProperty('followerId')
    expect(follower).toHaveProperty('followingId')
    expect(follower).toHaveProperty('createdAt')
    expect(follower).toHaveProperty('updatedAt')
  })
})
