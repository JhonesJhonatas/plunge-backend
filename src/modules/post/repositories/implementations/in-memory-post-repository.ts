import { randomUUID } from 'crypto'

import {
  ICreatePostDTO,
  IDeletePostDTO,
  IEditPostDTO,
  ISearchPostDto,
  ISearchPostResponseDto,
} from '@post/dto'

import { IPostRepository } from '@post/repositories/i-post-repository'
import { Post } from '@prisma/client'

export class InMemoryPostRepository implements IPostRepository {
  private posts: Post[] = [
    {
      id: '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3',
      createdAt: new Date(),
      updatedAt: new Date(),
      ups: 0,
      downs: 0,
      content: 'Hello, World!',
      mediaUrl: null,
      userId: randomUUID(),
    },
  ]

  async create(params: ICreatePostDTO): Promise<Post> {
    const post: Post = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      mediaUrl: null,
      ups: 0,
      downs: 0,
      ...params,
    }

    this.posts.push(post)

    return post
  }

  async edit(params: IEditPostDTO): Promise<Post> {
    const postIndex = this.posts.findIndex((post) => post.id === params.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...params,
    }

    return this.posts[postIndex]
  }

  async delete(params: IDeletePostDTO): Promise<Post> {
    const postIndex = this.posts.findIndex((post) => post.id === params.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    const post = this.posts[postIndex]

    this.posts.splice(postIndex, 1)

    return post
  }

  async findById(id: string): Promise<Post | null> {
    return this.posts.find((post) => post.id === id) || null
  }

  async getAll(): Promise<Post[]> {
    return this.posts
  }

  async searchByContent({
    content,
  }: ISearchPostDto): Promise<ISearchPostResponseDto[]> {
    const posts = this.posts.filter((post) => post.content.includes(content))

    return posts.map((post) => {
      return {
        id: post.id,
        content: post.content,
        mediaUrl: post.mediaUrl,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        ups: post.ups,
        downs: post.downs,
        userId: post.userId,
        author: {
          id: post.userId,
          name: 'John Doe',
          email: 'email@email.com',
          avatarUrl: 'http://avatar.com',
        },
      }
    })
  }
}
