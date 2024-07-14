import { Injectable } from '@nestjs/common'
import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class SearchPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(content: string) {
    return await this.postRepository.searchByContent(content)
  }
}
