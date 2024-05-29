import { inject, injectable } from 'tsyringe'

import { IPostRepository } from '@post/repository/i-post-repository'
import { IEditPostDTO } from '@post/dto/i-edit-post-dto'

@injectable()
export class EditPostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute({ id, content, mediaUrl }: IEditPostDTO) {
    return await this.postRepository.edit({ id, content, mediaUrl })
  }
}
