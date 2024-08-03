import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'

import { CreatePostService, GetAllPostsService } from '@post/services'

let getAllPostsService: GetAllPostsService
let createPostService: CreatePostService

describe('get-all-posts-service', () => {
  beforeEach(async () => {
    const postRepository = new InMemoryPostRepository()
    const userRepository = new InMemoryUserRepository()

    getAllPostsService = new GetAllPostsService(postRepository)
    createPostService = new CreatePostService(postRepository, userRepository)

    await createPostService.execute({
      userId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      content: 'any_content',
      mediaUrl: 'any_media_url',
    })
  })

  it('should be able to get all posts', async () => {
    const posts = await getAllPostsService.execute()

    posts.forEach((post) => {
      expect(post).toHaveProperty('id')
      expect(post).toHaveProperty('createdAt')
      expect(post).toHaveProperty('updatedAt')
      expect(post).toHaveProperty('content')
      expect(post).toHaveProperty('mediaUrl')
      expect(post).toHaveProperty('author')
    })
  })
})
