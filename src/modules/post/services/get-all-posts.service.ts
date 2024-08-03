import { Injectable } from '@nestjs/common'

import { PostRepository } from '@post/repositories/implementations/post-repository'
import { IPostFormatDto } from '@post/dto'

interface GetAllPostsServiceProps {
  userId: string
}

@Injectable()
export class GetAllPostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ userId }: GetAllPostsServiceProps) {
    const posts = await this.postRepository.getAll()

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
          userCanLike: user.id !== userId,
          userAleradyLiked: likes.some((like) => like.userId === userId),
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
