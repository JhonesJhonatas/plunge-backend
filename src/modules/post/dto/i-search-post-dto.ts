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

export interface ISearchPostDto {
  content?: string
  userId?: string
  authorOfSearchId?: string
}

export interface ISearchPostResponseDto extends Post {
  User: User
  Like: Like[]
}
