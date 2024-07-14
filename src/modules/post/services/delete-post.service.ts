import { AppError } from '@common/errors'
import { IDeletePostDTO } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'

export class DeletePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ id }: IDeletePostDTO) {
    const post = await this.postRepository.findById(id)

    if (!post) {
      throw new AppError('Post not found', 404)
    }

    return await this.postRepository.delete({ id })
  }
}
