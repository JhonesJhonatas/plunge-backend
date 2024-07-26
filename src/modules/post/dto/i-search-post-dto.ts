export interface ISearchPostDto {
  content?: string
  userId?: string
}

export interface ISearchPostResponseDto {
  id: string
  content: string
  mediaUrl?: string
  ups: number
  downs: number
  author: {
    id: string
    name: string
    avatarUrl?: string
  }
  createdAt: Date
  updatedAt: Date
}
