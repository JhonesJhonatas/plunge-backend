import { PostRepository } from '@post/repositories/implementations/post-repository'

export class GetAllPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute() {
    return await this.postRepository.getAll()
  }
}
