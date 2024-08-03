import { AppError } from '@common/errors'
import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'

import { DeletePostService } from '@post/services'

let deletePostService: DeletePostService

describe('delete-post-service', () => {
  beforeEach(async () => {
    const postRepository = new InMemoryPostRepository()
    deletePostService = new DeletePostService(postRepository)
  })

  it('should not be able to delete a post with a unexist postId', async () => {
    const id = 'unexist-post-id'

    await expect(deletePostService.execute({ id })).rejects.toEqual(
      new AppError('Post not found', 404),
    )
  })

  it('should be able to delete a post with a exist postId', async () => {
    const id = '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3'

    const deletedPost = await deletePostService.execute({ id })

    expect(deletedPost).toHaveProperty('id')
    expect(deletedPost).toHaveProperty('userId')
    expect(deletedPost).toHaveProperty('content')
    expect(deletedPost).toHaveProperty('mediaUrl')
    expect(deletedPost).toHaveProperty('createdAt')
    expect(deletedPost).toHaveProperty('updatedAt')
  })
})
