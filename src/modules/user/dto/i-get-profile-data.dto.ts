import { Post, User } from '@prisma/client'

export interface IGetProfileDataResponseDto extends User {
  posts: Post[]
  following: {
    followedBy: {
      name: string
      id: string
      nickName: string
      avatarUrl: string
    }
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  }[]
  followedBy: {
    following: {
      name: string
      id: string
      nickName: string
      avatarUrl: string
    }
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  }[]
}
