import { Post } from '@prisma/client'

import { ICreatePostDTO, IEditPostDTO } from '@post/dto'

export interface IPostRepository {
  create(params: ICreatePostDTO): Promise<Post>
  edit(params: IEditPostDTO): Promise<Post>
  delete(): Promise<Post>

  getAll(): Promise<Post[]>

  searchByContent(): Promise<Post[]>
}
