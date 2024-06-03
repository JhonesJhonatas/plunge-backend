import { inject, injectable } from 'tsyringe'
import { AppError } from '@/errors/app-error'

import { IPostRepository } from '@post/repository/i-post-repository'
import { ICreatePostDTO } from '@post/dto/i-create-post-dto'

import { IUserRepository } from '@user/repository/i-user-repository'

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute({ userId, content, mediaUrl, topics }: ICreatePostDTO) {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new AppError('User not found', 404)

    if (!topics.length) throw new AppError('Topics cannot be empty', 400)

    return await this.postRepository.create({
      userId,
      content,
      mediaUrl,
      topics,
    })
  }
}
