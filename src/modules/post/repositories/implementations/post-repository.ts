import { IPostRepository } from '@post/repositories/i-post-repository'

import {
  ICreatePostDTO,
  IDeletePostDTO,
  IEditPostDTO,
  ISearchPostDto,
  ISearchPostResponseDto,
} from '@post/dto'

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

  async searchByContent({
    content,
  }: ISearchPostDto): Promise<ISearchPostResponseDto[]> {
    const posts = await prismaClient.post.findMany({
      where: {
        content: {
          contains: content,
        },
      },
      include: {
        User: true,
      },
    })

    return posts.map((post) => ({
      id: post.id,
      content: post.content,
      mediaUrl: post.mediaUrl,
      ups: post.ups,
      downs: post.downs,
      author: {
        id: post.User.id,
        name: post.User.name,
        avatarUrl: post.User.avatarUrl,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }))
  }
}
