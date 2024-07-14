import { Injectable } from '@nestjs/common'

import { PostRepository } from '@post/repositories/implementations/post-repository'
@Injectable()
export class GetAllPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute() {
    return await this.postRepository.getAll()
  }
}
