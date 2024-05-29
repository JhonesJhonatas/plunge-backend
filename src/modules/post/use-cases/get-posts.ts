import { inject, injectable } from 'tsyringe'

import { IPostRepository } from '@post/repository/i-post-repository'

@injectable()
export class GetPostsUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute() {
    return await this.postRepository.get()
  }
}
