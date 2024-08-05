import { randomUUID } from 'crypto'

import {
  ICreatePostDTO,
  IDeletePostDTO,
  IEditPostDTO,
  IGetAllPostsResposeDto,
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

  async getAll(): Promise<IGetAllPostsResposeDto[]> {
    return this.posts.map((post) => {
      return {
        ...post,
        User: {
          id: 'asduahsda',
          name: 'User',
          nickName: '@user',
          bio: null,
          email: 'user@email.com',
          avatarUrl: 'sdasd.hmlt',
          password: '123123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        Like: [],
      }
    })
  }

  async searchByContent({
    content,
  }: ISearchPostDto): Promise<ISearchPostResponseDto[]> {
    const posts = this.posts.filter((post) => post.content.includes(content))

    const formattedPosts = posts.map((post) => {
      return {
        ...post,
        User: {
          id: 'asduahsda',
          name: 'User',
          nickName: '@user',
          bio: null,
          email: 'user@email.com',
          avatarUrl: 'sdasd.hmlt',
          password: '123123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        Like: [],
      }
    })

    return formattedPosts
  }
}
