import { inject, injectable } from 'tsyringe'

import { IPostRepository } from '@post/repository/i-post-repository'
import { ICreatePostDTO } from '../dto/i-create-post-dto'

import { UserRepository } from '@/modules/user/repository/implementations/user-repository'
import { AppError } from '@/errors/app-error'

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,

    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute({ userId, content, mediaUrl }: ICreatePostDTO) {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new AppError('User not found', 404)

    return await this.postRepository.create({ userId, content, mediaUrl })
  }
}
