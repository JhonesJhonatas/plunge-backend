import { InMemoryPostRepository } from '@post/repository/implementations/in-memory-post-repository'
import { DeletePostUseCase } from '@/modules/post/use-cases/delete-post-use-case'

let deletePostUseCase: DeletePostUseCase

describe('delete-post-use-case', () => {
  beforeEach(() => {
    const postRepository = new InMemoryPostRepository()
    deletePostUseCase = new DeletePostUseCase(postRepository)
  })

  it('should delete a post', async () => {
    const post = await deletePostUseCase.execute(
      'c9ab66be-7bbb-40fa-96c7-58f22589f141',
    )

    expect(post).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: '',
      mediaUrl: '',
      userId: '',
      ups: 0,
      downs: 0,
      edited: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
