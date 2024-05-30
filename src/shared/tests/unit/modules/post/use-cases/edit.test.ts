import { EditPostUseCase } from '@/modules/post/use-cases/edit-post'
import { InMemoryPostRepository } from '@post/repository/implementations/in-memory-post-repository'

let editPostUseCase: EditPostUseCase

describe('get-post-use-case', () => {
  beforeEach(() => {
    const postRepository = new InMemoryPostRepository()
    editPostUseCase = new EditPostUseCase(postRepository)
  })

  it('should edit a post', async () => {
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
})
