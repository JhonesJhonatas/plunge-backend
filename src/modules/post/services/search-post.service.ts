import { Injectable } from '@nestjs/common'
import { ISearchPostDto } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class SearchPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ content }: ISearchPostDto) {
    return await this.postRepository.searchByContent(content)
  }
}
