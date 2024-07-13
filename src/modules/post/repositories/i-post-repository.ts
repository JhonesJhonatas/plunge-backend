import { Post } from '@prisma/client'

import { ICreatePostDTO, IDeletePostDTO, IEditPostDTO } from '@post/dto'

export interface IPostRepository {
  create(params: ICreatePostDTO): Promise<Post>
  edit(params: IEditPostDTO): Promise<Post>
  delete(params: IDeletePostDTO): Promise<Post>

  findById(id: string): Promise<Post | null>

  getAll(): Promise<Post[]>

  searchByContent(content: string): Promise<Post[]>
}
