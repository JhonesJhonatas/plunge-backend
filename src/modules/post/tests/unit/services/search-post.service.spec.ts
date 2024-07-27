import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'

import { CreatePostService, SearchPostService } from '@post/services'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

let searchAllPostsService: SearchPostService
let createPostService: CreatePostService

describe('edit-post-service', () => {
  beforeEach(async () => {
    const postRepository = new InMemoryPostRepository()
    const userRepository = new InMemoryUserRepository()

    searchAllPostsService = new SearchPostService(postRepository)
    createPostService = new CreatePostService(postRepository, userRepository)

    await createPostService.execute({
      userId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      content: 'any_content',
      mediaUrl: 'any_media_url',
    })
  })

  it('should be able to search post without any param', async () => {
    const posts = await searchAllPostsService.execute({})

    posts.forEach((post) => {
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('createdAt')
      expect(post).toHaveProperty('updatedAt')
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('mediaUrl')
      expect(post).toHaveProperty('ups')
      expect(post).toHaveProperty('downs')
    })
  })

  it('should be able to search post by content', async () => {
    const posts = await searchAllPostsService.execute({
      content: 'any_content',
    })

    posts.forEach((post) => {
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('createdAt')
      expect(post).toHaveProperty('updatedAt')
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('mediaUrl')
      expect(post).toHaveProperty('ups')
      expect(post).toHaveProperty('downs')
    })
  })

  it('should be able to search post by userId', async () => {
    const posts = await searchAllPostsService.execute({
      userId: '42a50108-3d20-4f4e-9565-20b4945c21da',
    })

    posts.forEach((post) => {
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('createdAt')
      expect(post).toHaveProperty('updatedAt')
      expect(post).toHaveProperty('userId')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('mediaUrl')
      expect(post).toHaveProperty('ups')
      expect(post).toHaveProperty('downs')
    })
  })
})
