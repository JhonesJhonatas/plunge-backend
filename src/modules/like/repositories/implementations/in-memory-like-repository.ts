import { Like } from '@prisma/client'

import { ILikeRepository } from '@like/repositories/i-like-repository-repository'

import { ILikePostDto, IUnlikePostDto } from '@like/dto'
import { randomUUID } from 'crypto'

export class InMemoryLikeRepository implements ILikeRepository {
  private likes: Like[] = []

  likePost({ postId, userId }: ILikePostDto): Promise<Like> {
    const like: Like = {
      id: randomUUID(),
      postId,
      userId,
      createdAt: new Date(),
    }

    this.likes.push(like)

    return Promise.resolve(like)
  }

  unlikePost({ postId, userId }: IUnlikePostDto): Promise<Like> {
    const likeIndex = this.likes.findIndex(
      (like) => like.postId === postId && like.userId === userId,
    )

    const like = this.likes[likeIndex]

    this.likes.splice(likeIndex, 1)

    return Promise.resolve(like)
  }
}
