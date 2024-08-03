import { Post } from '@prisma/client'

import { RatePostService } from '@like/services'

import { CreatePostService } from '@post/services'
import { CreateUserService } from '@user/services'

import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'
import { InMemoryLikeRepository } from '@like/repositories/implementations/in-memory-like-repository'
import { AppError } from '@/modules/common/errors'

let createUserService: CreateUserService
let createPostService: CreatePostService
let ratePostService: RatePostService

type CreatedUser = {
  id: string
  name: string
  nickName: string
  bio: string
  email: string
  createdAt: Date
}

let user: CreatedUser
let post: Post

describe('rate-post-service', () => {
  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository()
    const postRepository = new InMemoryPostRepository()
    const likeRepository = new InMemoryLikeRepository()

    createUserService = new CreateUserService(userRepository)
    createPostService = new CreatePostService(postRepository, userRepository)
    ratePostService = new RatePostService(
      likeRepository,
      userRepository,
      postRepository,
    )

    user = await createUserService.execute({
      email: 'usertorate@email.com',
      avatarUrl: 'http://avatar.com',
      bio: 'just a user to rate',
      name: 'User to Rate',
      password: '123456',
      nickName: '@usertorate',
    })

    post = await createPostService.execute({
      content: 'Post to Rate',
      userId: user.id,
      mediaUrl: null,
    })
  })

  it('should not be able to rate a post if user does not exist', async () => {
    await expect(
      ratePostService.execute({
        like: true,
        userId: 'unexisted-user-id',
        postId: post.id,
      }),
    ).rejects.toEqual(new AppError('User not found', 404))
  })

  it('should not be able to rate a post that does not exist', async () => {
    await expect(
      ratePostService.execute({
        like: true,
        userId: user.id,
        postId: 'unexisted-post-id',
      }),
    ).rejects.toEqual(new AppError('Post not found', 404))
  })

  it('should be able to rate a post', async () => {
    const ratedPost = await ratePostService.execute({
      postId: post.id,
      userId: user.id,
      like: true,
    })

    expect(ratedPost).toHaveProperty('id')
    expect(ratedPost.postId).toBe(post.id)
    expect(ratedPost.userId).toBe(user.id)
  })
})
