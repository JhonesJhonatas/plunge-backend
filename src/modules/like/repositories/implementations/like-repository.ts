import { PrismaClient } from '@prisma/client'

import { ILikeRepository } from '@like/repositories/i-like-repository-repository'

import { ILikePostDto, IUnlikePostDto } from '@like/dto'

const prismaClient = new PrismaClient()

export class LikeRepository implements ILikeRepository {
  async likePost(params: ILikePostDto) {
    return prismaClient.like.create({
      data: {
        userId: params.userId,
        postId: params.postId,
      },
    })
  }

  async unlikePost(params: IUnlikePostDto) {
    return prismaClient.like.delete({
      where: {
        userId_postId: {
          userId: params.userId,
          postId: params.postId,
        },
      },
    })
  }
}
