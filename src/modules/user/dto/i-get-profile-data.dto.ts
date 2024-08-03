import { Follower, Post, User } from '@prisma/client'

export interface IGetProfileDataResponseDto extends User {
  posts: Post[]
  followers: Follower[]
  following: Follower[]
}
