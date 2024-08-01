import { Injectable } from '@nestjs/common'
import { IPostFormatDto, ISearchPostDto } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class SearchPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ content, userId }: ISearchPostDto) {
    const posts = await this.postRepository.searchByContent({ content, userId })

    const formattedPosts: IPostFormatDto[] = posts.map(
      ({
        User: user,
        id,
        content,
        mediaUrl,
        ups,
        downs,
        createdAt,
        updatedAt,
      }) => {
        return {
          id,
          content,
          mediaUrl,
          ups,
          downs,
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
