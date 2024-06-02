import { AppError } from '@/errors/app-error'
import { InMemoryCommentRepository } from '@/modules/comment/repository/implementations/in-memory-comment-repository'
import { EditCommentUseCase } from '@/modules/comment/use-cases/edit-comment-use-case'

let editCommentUseCase: EditCommentUseCase

describe('edit-coment-use-case', () => {
  beforeEach(() => {
    const commentRepository = new InMemoryCommentRepository()

    editCommentUseCase = new EditCommentUseCase(commentRepository)
  })

  it('should be able to edit a comment', async () => {
    const comment = await editCommentUseCase.execute({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'comment edited',
    })

    expect(comment).toEqual({
      id: 'c9ab66be-7bbb-40fa-96c7-58f22589f141',
      content: 'comment edited',
      ups: 0,
      downs: 0,
      postId: 'post-id',
      userId: 'user-id',
      edited: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should not be able to edit a comment that does not exist', async () => {
    const commentToEdit = {
      id: 'invalid-id',
      content: 'comment edited',
    }

    await expect(editCommentUseCase.execute(commentToEdit)).rejects.toEqual(
      new AppError('Comment not found', 404),
    )
  })
})
