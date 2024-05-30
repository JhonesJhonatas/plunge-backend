import { Comment } from '@prisma/client'

import { ICommentRepository } from '@comment/repository/i-comment-repository'
import { ICreateCommentDTO } from '@comment/dto/i-create-comment-dto'
import { IEditCommentDTO } from '@comment/dto/i-edit-comment-dto'
import { randomUUID } from 'crypto'

export class InMemoryCommentRepository implements ICommentRepository {
  private comments: Comment[] = []

  create({ content, postId, userId }: ICreateCommentDTO): Promise<Comment> {
    const randomId = randomUUID()

    const commentToCreate: Comment = {
      id: randomId,
      content,
      postId,
      userId,
      ups: 0,
      downs: 0,
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.comments.push(commentToCreate)

    const createdComment = this.comments.find(
      (comment) => comment.id === randomId,
    )

    return Promise.resolve(createdComment as Comment)
  }

  edit({ id, content }: IEditCommentDTO): Promise<Comment> {
    const commentIndex = this.comments.findIndex((comment) => comment.id === id)

    const comment = this.comments[commentIndex]

    this.comments[commentIndex] = {
      ...comment,
      content,
      edited: true,
      updatedAt: new Date(),
    }

    return Promise.resolve(this.comments[commentIndex])
  }

  delete(id: string): Promise<Comment> {
    const commentIndex = this.comments.findIndex((comment) => comment.id === id)

    const deletedComment = this.comments[commentIndex]

    this.comments.splice(commentIndex, 1)

    return Promise.resolve(deletedComment)
  }

  get(): Promise<Comment[]> {
    return Promise.resolve(this.comments)
  }

  getById(id: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) => comment.id === id)

    return Promise.resolve(comment || null)
  }
}
