import { AppError } from '@common/errors'
import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'
import { CreatePostService } from '@post/services/create-post.service'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

let createPostService: CreatePostService

describe('create-post-service', () => {
  beforeEach(async () => {
    const postRepository = new InMemoryPostRepository()
    const userRepository = new InMemoryUserRepository()
    createPostService = new CreatePostService(postRepository, userRepository)
  })

  it('should not be able to create a post with a unexist userId', async () => {
    const postToCreate = {
      userId: 'unexist-user-id',
      content: 'any_content',
    }

    await expect(createPostService.execute(postToCreate)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should be able to create a post with only userId and content fileds', async () => {
    const postToCreate = {
      userId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      content: 'any_content',
    }

    const createdPost = await createPostService.execute(postToCreate)

    expect(createdPost).toHaveProperty('id')
    expect(createdPost).toHaveProperty('createdAt')
    expect(createdPost).toHaveProperty('updatedAt')
    expect(createdPost).toHaveProperty('userId')
    expect(createdPost).toHaveProperty('content')

    expect(createdPost.userId).toBe(postToCreate.userId)
    expect(createdPost.content).toBe(postToCreate.content)
  })

  it('should be able to create a post with all fileds filled', async () => {
    const postToCreate = {
      userId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      content: 'any_content',
      mediaUrl: 'any_media_url',
    }

    const createdPost = await createPostService.execute(postToCreate)

    expect(createdPost).toHaveProperty('id')
    expect(createdPost).toHaveProperty('createdAt')
    expect(createdPost).toHaveProperty('updatedAt')
    expect(createdPost).toHaveProperty('userId')
    expect(createdPost).toHaveProperty('content')

    expect(createdPost.userId).toBe(postToCreate.userId)
    expect(createdPost.content).toBe(postToCreate.content)
    expect(createdPost.mediaUrl).toBe(postToCreate.mediaUrl)
  })
})
