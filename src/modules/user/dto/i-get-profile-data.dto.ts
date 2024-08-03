import { Follower, Post, User } from '@prisma/client'

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

interface PostSchema extends Post {
  Like: Like[]
}

export interface IGetProfileDataResponseDto extends User {
  posts: PostSchema[]
  followers: Follower[]
  following: Follower[]
}
