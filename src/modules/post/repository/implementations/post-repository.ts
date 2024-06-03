import { Post, PrismaClient } from '@prisma/client'

import { IPostRepository } from '@post/repository/i-post-repository'
import { ICreatePostDTO } from '@post/dto/i-create-post-dto'
import { IEditPostDTO } from '@post/dto/i-edit-post-dto'

export class PostRepository implements IPostRepository {
  private prismaClient = new PrismaClient()

  async create({
    content,
    mediaUrl,
    userId,
    topics,
  }: ICreatePostDTO): Promise<Post> {
    const createdPost = await this.prismaClient.post.create({
      data: {
        content,
        mediaUrl,
        userId,
        topics,
      },
    })

    return createdPost
  }

  async edit({ id, content, mediaUrl, topics }: IEditPostDTO): Promise<Post> {
    const editedPost = await this.prismaClient.post.update({
      where: {
        id,
      },
      data: {
        content,
        mediaUrl,
        edited: true,
        topics,
      },
    })

    return editedPost
  }

  async delete(id: string): Promise<Post> {
    const deletedPosts = await this.prismaClient.post.delete({
      where: {
        id,
      },
    })

    return deletedPosts
  }

  async get(): Promise<Post[]> {
    const posts = await this.prismaClient.post.findMany()

    return posts
  }

  async getById(id: string): Promise<Post | null> {
    const post = await this.prismaClient.post.findUnique({
      where: {
        id,
      },
    })

    return post
  }
}
