import { AppError } from '@/errors/app-error'
import { ICreateCommentDTO } from '@/modules/comment/dto/i-create-comment-dto'
import { CreateCommentUseCase } from '@/modules/comment/use-cases/create-comment-use-case'

import { InMemoryPostRepository } from '@/modules/post/repository/implementations/in-memory-post-repository'
import { CreatePostUseCase } from '@/modules/post/use-cases/create-post-use-case'
import { InMemoryTopicRepository } from '@/modules/topic/repository/implementations/in-memory-topic-repository'
import { InMemoryUserRepository } from '@/modules/user/repository/implementations/in-memory-user-repository'
import { CreateUserUseCase } from '@/modules/user/use-cases/create-user-use-case'
import { InMemoryCommentRepository } from '@comment/repository/implementations/in-memory-comment-repository'

let createCommentUseCase: CreateCommentUseCase
let createUserUseCase: CreateUserUseCase
let createPostUseCase: CreatePostUseCase

describe('create-comment-use-case', () => {
  beforeEach(() => {
    const commentRepository = new InMemoryCommentRepository()
    const userRepository = new InMemoryUserRepository()
    const postRepository = new InMemoryPostRepository()
    const topicRepository = new InMemoryTopicRepository()

    createUserUseCase = new CreateUserUseCase(userRepository, topicRepository)

    createPostUseCase = new CreatePostUseCase(userRepository, postRepository)

    createCommentUseCase = new CreateCommentUseCase(
      commentRepository,
      userRepository,
      postRepository,
    )
  })

  it('should not be able to create a comment with a non-existing user', async () => {
    const createdUser = await createUserUseCase.execute({
      name: 'Tester',
      userName: 'tester123',
      email: 'tester@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    })

    const createdPost = await createPostUseCase.execute({
      content: 'post content',
      mediaUrl: 'mediaUrl',
      userId: createdUser.id,
    })

    const commentToCreate: ICreateCommentDTO = {
      content: 'comment content',
      postId: createdPost.id,
      userId: 'unexistent-user-id',
    }

    await expect(createCommentUseCase.execute(commentToCreate)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should not be able to create a comment with a non-existing post', async () => {
    const createdUser = await createUserUseCase.execute({
      name: 'Tester',
      userName: 'tester123',
      email: 'tester@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    })

    const commentToCreate: ICreateCommentDTO = {
      content: 'comment content',
      postId: 'unexistent-post-id',
      userId: createdUser.id,
    }

    await expect(createCommentUseCase.execute(commentToCreate)).rejects.toEqual(
      new AppError('Post not found', 404),
    )
  })

  it('should be able to create a comment', async () => {
    const createdUser = await createUserUseCase.execute({
      name: 'Tester',
      userName: 'tester123',
      email: 'tester@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    })

    const createdPost = await createPostUseCase.execute({
      content: 'post content',
      mediaUrl: 'mediaUrl',
      userId: createdUser.id,
    })

    const commentToCreate: ICreateCommentDTO = {
      content: 'comment content',
      postId: createdPost.id,
      userId: createdUser.id,
    }

    const createdComment = await createCommentUseCase.execute(commentToCreate)

    expect(createdComment).toHaveProperty('id')
    expect(createdComment.content).toBe(commentToCreate.content)
    expect(createdComment.postId).toBe(commentToCreate.postId)
    expect(createdComment.userId).toBe(commentToCreate.userId)
  })
})
