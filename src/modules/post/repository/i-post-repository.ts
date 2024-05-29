import { Post } from '@prisma/client'

import { ICreatePostDTO } from '@post/dto/i-create-post-dto'
import { IEditPostDTO } from '@post/dto/i-edit-post-dto'

export interface IPostRepository {
  create({ content, mediaUrl, userId }: ICreatePostDTO): Promise<Post>
  edit({ id, content, mediaUrl }: IEditPostDTO): Promise<Post>
  delete(id: string): Promise<Post>
  get(): Promise<Post[]>
}
