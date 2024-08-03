import { Injectable } from '@nestjs/common'

import { LikeRepository } from '@like/repositories/implementations/like-repository'
import { UserRepository } from '@user/repositories/implementations/user-repository'
import { PostRepository } from '@post/repositories/implementations/post-repository'

import { IRatePostDto } from '@like/dto'
import { AppError } from '@/modules/common/errors'

@Injectable()
export class RatePostService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async execute({ postId, userId, like }: IRatePostDto) {
    const [user, post] = await Promise.all([
      this.userRepository.findById(userId),
      this.postRepository.findById(postId),
    ])

    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (!post) {
      throw new AppError('Post not found', 404)
    }

    if (like) {
      return await this.likeRepository.likePost({ postId, userId })
    }

    return await this.likeRepository.unlikePost({ postId, userId })
  }
}
