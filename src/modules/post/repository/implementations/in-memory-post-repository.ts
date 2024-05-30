import { randomUUID } from 'crypto'
import { Post } from '@prisma/client'

import { IPostRepository } from '@post/repository/i-post-repository'
import { ICreatePostDTO } from '@post/dto/i-create-post-dto'
import { IEditPostDTO } from '@post/dto/i-edit-post-dto'

export class InMemoryPostRepository implements IPostRepository {
  private posts: Post[] = [
    {
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: '',
      mediaUrl: '',
      userId: '',
      ups: 0,
      downs: 0,
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  async create({ content, mediaUrl, userId }: ICreatePostDTO): Promise<Post> {
    const post = {
      id: randomUUID(),
      content,
      mediaUrl: mediaUrl || null,
      userId,
      ups: 0,
      downs: 0,
      edited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.posts.push(post)

    return post
  }

  async edit({ id, content, mediaUrl }: IEditPostDTO): Promise<Post> {
    const postIndex = this.posts.findIndex((post) => post.id === id)

    const post = this.posts[postIndex]

    const editedPost = {
      id,
    }

    if (content && mediaUrl) Object.assign(editedPost, { content, mediaUrl })

    if (content && !mediaUrl) Object.assign(editedPost, { content })

    if (!content && mediaUrl) Object.assign(editedPost, { mediaUrl })

    this.posts[postIndex] = {
      ...post,
      ...editedPost,
      edited: true,
      updatedAt: new Date(),
    }

    return this.posts[postIndex]
  }

  async delete(id: string): Promise<Post> {
    const postIndex = this.posts.findIndex((post) => post.id === id)

    const deletedPost = this.posts[postIndex]

    this.posts.splice(postIndex, 1)

    return deletedPost
  }

  async get(): Promise<Post[]> {
    return this.posts
  }

  async getById(id: string): Promise<Post | null> {
    const post = this.posts.find((post) => post.id === id) || null

    return post
  }
}
