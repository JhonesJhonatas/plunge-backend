import { Comment } from '@prisma/client'

import { ICreateCommentDTO } from '@comment/dto/i-create-comment-dto'
import { IEditCommentDTO } from '@comment/dto/i-edit-comment-dto'

export interface ICommentRepository {
  create(props: ICreateCommentDTO): Promise<Comment>
  edit(props: IEditCommentDTO): Promise<Comment>
  delete(id: string): Promise<Comment>
  get(): Promise<Comment[]>

  getById(id: string): Promise<Comment | null>
}
