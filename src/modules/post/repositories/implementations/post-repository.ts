import { IPostRepository } from '@post/repositories/i-post-repository'

import { ICreatePostDTO, IDeletePostDTO, IEditPostDTO } from '@post/dto'

import { Post, PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()
export class PostRepository implements IPostRepository {
  async create(params: ICreatePostDTO): Promise<Post> {
    return await prismaClient.post.create({
      data: params,
    })
  }

  async edit(params: IEditPostDTO): Promise<Post> {
    const { id, ...rest } = params
    return await prismaClient.post.update({
      where: { id },
      data: {
        ...rest,
      },
    })
  }

  async delete({ id }: IDeletePostDTO): Promise<Post> {
    return await prismaClient.post.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<Post | null> {
    return await prismaClient.post.findFirst({
      where: {
        id,
      },
    })
  }

  async getAll(): Promise<Post[]> {
    return await prismaClient.post.findMany()
  }

  async searchByContent(content: string): Promise<Post[]> {
    return await prismaClient.post.findMany({
      where: {
        content: {
          contains: content,
        },
      },
    })
  }
}
