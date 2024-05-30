import { Comment, PrismaClient } from '@prisma/client'

import { ICommentRepository } from '@comment/repository/i-comment-repository'

import { ICreateCommentDTO } from '@comment/dto/i-create-comment-dto'
import { IEditCommentDTO } from '@comment/dto/i-edit-comment-dto'

const prismaClient = new PrismaClient()

export class CommentRepository implements ICommentRepository {
  async create({
    content,
    postId,
    userId,
  }: ICreateCommentDTO): Promise<Comment> {
    return await prismaClient.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    })
  }

  async edit(props: IEditCommentDTO): Promise<Comment> {
    return await prismaClient.comment.update({
      where: {
        id: props.id,
      },
      data: {
        content: props.content,
        edited: true,
      },
    })
  }

  async delete(id: string): Promise<Comment> {
    return await prismaClient.comment.delete({
      where: {
        id,
      },
    })
  }

  async get(): Promise<Comment[]> {
    return await prismaClient.comment.findMany()
  }

  async getById(id: string): Promise<Comment | null> {
    return await prismaClient.comment.findUnique({
      where: {
        id,
      },
    })
  }
}
