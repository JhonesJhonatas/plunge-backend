import { AppError } from '@/errors/app-error'
import { EditPostUseCase } from '@/modules/post/use-cases/edit-post-use-case'
import { InMemoryPostRepository } from '@post/repository/implementations/in-memory-post-repository'

let editPostUseCase: EditPostUseCase

describe('get-post-use-case', () => {
  beforeEach(() => {
    const postRepository = new InMemoryPostRepository()
    editPostUseCase = new EditPostUseCase(postRepository)
  })

  it('should not be able to edit a post with wrong id', async () => {
    const postToEdit = {
      id: 'wrong-id',
      content: 'content',
      mediaUrl: 'media url',
    }

    await expect(editPostUseCase.execute(postToEdit)).rejects.toEqual(
      new AppError('Post not found', 404),
    )
  })

  it('should be able to edit a post with complete data', async () => {
    const post = await editPostUseCase.execute({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'new content',
      mediaUrl: 'new media url',
    })

    expect(post).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'new content',
      mediaUrl: 'new media url',
      userId: '',
      ups: 0,
      downs: 0,
      edited: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should be able to edit a post without changing the content', async () => {
    const post = await editPostUseCase.execute({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      mediaUrl: 'new media url',
    })

    expect(post).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      mediaUrl: 'new media url',
      content: '',
      userId: '',
      ups: 0,
      downs: 0,
      edited: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should be able to edit a post without changing the mediaUrl', async () => {
    const post = await editPostUseCase.execute({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'new media url',
    })

    expect(post).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      mediaUrl: '',
      content: 'new media url',
      userId: '',
      ups: 0,
      downs: 0,
      edited: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
