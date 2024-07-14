import { AppError } from '@common/errors'
import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'

import { EditPostService } from '@post/services'

let editPostService: EditPostService

describe('edit-post-service', () => {
  beforeEach(async () => {
    const postRepository = new InMemoryPostRepository()
    editPostService = new EditPostService(postRepository)
  })

  it('should not be able to edit a post without content or mediaUrl', async () => {
    const postToEdit = {
      id: '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3',
    }

    await expect(editPostService.execute(postToEdit)).rejects.toEqual(
      new AppError('You must provide at least one field to update', 400),
    )
  })

  it('should not be able to edit a post that does not exist', async () => {
    const postToEdit = {
      id: 'unexist-id',
      content: 'Hello, World!',
    }

    await expect(editPostService.execute(postToEdit)).rejects.toEqual(
      new AppError('Post not found', 404),
    )
  })

  it('should be able to edit a post with a content', async () => {
    const postToEdit = {
      id: '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3',
      content: 'Hello, World!',
    }

    const editedPost = await editPostService.execute(postToEdit)

    expect(editedPost.content).toBe('Hello, World!')
  })

  it('should be able to edit a post with a mediaUrl', async () => {
    const postToEdit = {
      id: '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3',
      mediaUrl: 'Hello, World!',
    }

    const editedPost = await editPostService.execute(postToEdit)

    expect(editedPost.mediaUrl).toBe('Hello, World!')
  })

  it('should be able to edit a post with a content and a mediaUrl', async () => {
    const postToEdit = {
      id: '5d3ac767-ca8f-42f8-8e3d-bfbfe74256a3',
      content: 'Opaa',
      mediaUrl: 'Hello, World!',
    }

    const editedPost = await editPostService.execute(postToEdit)

    expect(editedPost.content).toBe('Opaa')
    expect(editedPost.mediaUrl).toBe('Hello, World!')
  })
})
