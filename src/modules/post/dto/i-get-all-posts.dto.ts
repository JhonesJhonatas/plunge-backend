import { Post, User } from '@prisma/client'

type Like = {
  id: string
  userId: string
  postId: string
  createdAt: Date
  user: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

export interface IGetAllPostsResposeDto extends Post {
  User: User
  Like: Like[]
}
