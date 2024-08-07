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

interface FollowerType extends Follower {
  following: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

interface FollowingType extends Follower {
  follower: {
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
  followers: FollowerType[]
  following: FollowingType[]
}
