type Author = {
  id: string
  name: string
  avatarUrl?: string
  nickName?: string
}

export interface IPostFormatDto {
  id: string
  content: string
  mediaUrl?: string
  ups: number
  downs: number
  author: Author
  createdAt: Date
  updatedAt: Date
}
