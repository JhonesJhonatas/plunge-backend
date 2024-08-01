import { Post, User } from '@prisma/client'

export interface ISearchPostDto {
  content?: string
  userId?: string
}

export interface ISearchPostResponseDto extends Post {
  User: User
}
