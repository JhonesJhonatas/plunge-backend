import { AppError } from '@common/errors'
import { Injectable } from '@nestjs/common'
import { ICreatePostDTO } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'
import { UserRepository } from '@user/repositories/implementations/user-repository'

@Injectable()
export class CreatePostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(params: ICreatePostDTO) {
    const user = await this.userRepository.findById(params.userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return await this.postRepository.create(params)
  }
}
