import { DeleteCommentUseCase } from '@comment/use-cases/delete-comment-use-case'
import { InMemoryCommentRepository } from '@comment/repository/implementations/in-memory-comment-repository'

let deleteCommentUseCase: DeleteCommentUseCase

describe('delete-post-use-case', () => {
  beforeEach(() => {
    const commentRepository = new InMemoryCommentRepository()

    deleteCommentUseCase = new DeleteCommentUseCase(commentRepository)
  })

  it('should be able to delete a comment', async () => {
    const comment = await deleteCommentUseCase.execute(
      'c9ab66be-7bbb-40fa-96c7-58f22589f141',
    )

    expect(comment).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'comment content',
      ups: 0,
      downs: 0,
      postId: 'post-id',
      userId: 'user-id',
      edited: false,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
