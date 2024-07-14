import { AppError } from '@common/errors'
import { Injectable } from '@nestjs/common'
import { IEditPostDTO } from '@post/dto'

import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class EditPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(params: IEditPostDTO) {
    if (!params.content && !params.mediaUrl) {
      throw new AppError('You must provide at least one field to update', 400)
    }

    const post = await this.postRepository.findById(params.id)

    if (!post) {
      throw new AppError('Post not found', 404)
    }

    return await this.postRepository.edit(params)
  }
}
