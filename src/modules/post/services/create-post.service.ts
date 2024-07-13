import { Injectable } from '@nestjs/common'
import { ICreatePostDTO } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class CreatePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(params: ICreatePostDTO) {
    return await this.postRepository.create(params)
  }
}
