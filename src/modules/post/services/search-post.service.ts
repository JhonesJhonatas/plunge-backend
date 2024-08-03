import { Injectable } from '@nestjs/common'
import { IPostFormatDto, ISearchPostDto } from '@post/dto'
import { PostRepository } from '@post/repositories/implementations/post-repository'

@Injectable()
export class SearchPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ content, userId, authorOfSearchId }: ISearchPostDto) {
    const posts = await this.postRepository.searchByContent({ content, userId })

    const formattedPosts: IPostFormatDto[] = posts.map(
      ({
        User: user,
        Like: likes,
        id,
        content,
        mediaUrl,
        createdAt,
        updatedAt,
      }) => {
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
          likesCount: likes.length,
          userCanLike: user.id !== authorOfSearchId,
          userAleradyLiked: likes.some(
            (like) => like.userId === authorOfSearchId,
          ),
          likes: likes.map((like) => {
            return {
              id: like.id,
              createdAt: like.createdAt,
              user: {
                id: like.user.id,
                name: like.user.name,
                nickName: like.user.nickName,
                avatarUrl: like.user.avatarUrl,
              },
            }
          }),
        }
      },
    )

    return formattedPosts
  }
}
