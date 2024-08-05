type Author = {
  id: string
  name: string
  avatarUrl?: string
  nickName?: string
}

type Like = {
  id: string
  createdAt: Date
  user: {
    id: string
    name: string
    nickName: string
    avatarUrl: string
  }
}

export interface IPostFormatDto {
  id: string
  content: string
  mediaUrl?: string
  author: Author
  likes: Like[]
  likesCount: number
  userCanLike: boolean
  userAleradyLiked: boolean
  createdAt: Date
  updatedAt: Date
}
