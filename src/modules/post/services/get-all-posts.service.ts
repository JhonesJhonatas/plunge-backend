import { Injectable } from '@nestjs/common'

import { PostRepository } from '@post/repositories/implementations/post-repository'
import { IPostFormatDto } from '../dto'
@Injectable()
export class GetAllPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute() {
    const posts = await this.postRepository.getAll()

    const formattedPosts: IPostFormatDto[] = posts.map(
      ({ User: user, id, content, mediaUrl, createdAt, updatedAt }) => {
        return {
          id,
          content,
          mediaUrl,
          createdAt,
          updatedAt,
          author: {
            id: user.id,
            name: user.name,
            avatarUrl: user.avatarUrl,
            nickName: user.nickName,
          },
        }
      },
    )

    return formattedPosts
  }
}
