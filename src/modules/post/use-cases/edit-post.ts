import { inject, injectable } from 'tsyringe'

import { IPostRepository } from '@post/repository/i-post-repository'
import { IEditPostDTO } from '@post/dto/i-edit-post-dto'
import { AppError } from '@/errors/app-error'

@injectable()
export class EditPostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute({ id, content, mediaUrl }: IEditPostDTO) {
    const post = await this.postRepository.getById(id)

    if (!post) throw new AppError('Post not found', 404)

    return await this.postRepository.edit({ id, content, mediaUrl })
  }
}
