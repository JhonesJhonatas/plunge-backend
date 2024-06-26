import { AppError } from '@/errors/app-error'
import { CreatePostUseCase } from '@/modules/post/use-cases/create-post-use-case'
import { InMemoryUserRepository } from '@/modules/user/repository/implementations/in-memory-user-repository'
import { InMemoryPostRepository } from '@post/repository/implementations/in-memory-post-repository'

let createPostUseCase: CreatePostUseCase

describe('create-post-use-case', () => {
  beforeEach(() => {
    const postRepository = new InMemoryPostRepository()
    const userRepository = new InMemoryUserRepository()
    createPostUseCase = new CreatePostUseCase(userRepository, postRepository)
  })

  it('should be able to create post with complete data', async () => {
    const postToCreate = {
      content: 'content',
      mediaUrl: 'mediaUrl',
      userId: 'd51feab3-b0df-468f-928a-b06e11776bed',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    const post = await createPostUseCase.execute(postToCreate)

    expect(post).toHaveProperty('id')
    expect(post.content).toBe(postToCreate.content)
    expect(post.mediaUrl).toBe(postToCreate.mediaUrl)
    expect(post.userId).toBe(postToCreate.userId)
  })

  it('should be able to create a post without a mediaUrl', async () => {
    const postToCreate = {
      content: 'content',
      userId: 'd51feab3-b0df-468f-928a-b06e11776bed',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    const post = await createPostUseCase.execute(postToCreate)

    expect(post).toHaveProperty('id')
    expect(post.content).toBe(postToCreate.content)
    expect(post.userId).toBe(postToCreate.userId)
  })

  it('should not be able to create post with invalid user id', async () => {
    const postToCreate = {
      content: 'content',
      mediaUrl: 'mediaUrl',
      userId: 'invalid-user-id',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    }

    await expect(createPostUseCase.execute(postToCreate)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should not be able to create post without topics', async () => {
    const postToCreate = {
      content: 'content',
      mediaUrl: 'mediaUrl',
      userId: 'd51feab3-b0df-468f-928a-b06e11776bed',
      topics: [],
    }

    await expect(createPostUseCase.execute(postToCreate)).rejects.toEqual(
      new AppError('Topics cannot be empty', 400),
    )
  })
})
