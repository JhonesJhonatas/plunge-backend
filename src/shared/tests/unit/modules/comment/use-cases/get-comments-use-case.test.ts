import { InMemoryCommentRepository } from '@comment/repository/implementations/in-memory-comment-repository'
import { GetCommentsUseCase } from '@comment/use-cases/get-comments-use-case'

const commentRepository = new InMemoryCommentRepository()
const getCommentsUseCase = new GetCommentsUseCase(commentRepository)

describe('get-comments-use-case', () => {
  it('should be able to find all comments', async () => {
    const comments = await getCommentsUseCase.execute()

    expect(comments).toBeInstanceOf(Array)
  })
})
