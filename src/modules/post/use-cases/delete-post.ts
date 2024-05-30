import { inject, injectable } from 'tsyringe'

import { IPostRepository } from '@post/repository/i-post-repository'

@injectable()
export class DeletePostUseCase {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute(id: string) {
    return await this.postRepository.delete(id)
  }
}
