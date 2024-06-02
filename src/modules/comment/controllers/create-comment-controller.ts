import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreateCommentUseCase } from '@comment/use-cases/create-comment-use-case'

export class CreateCommentController {
  async handle(request: Request, response: Response) {
    const { content, postId, userId } = request.body

    const createCommnentUseCase = container.resolve(CreateCommentUseCase)

    const createdComment = await createCommnentUseCase.execute({
      content,
      postId,
      userId,
    })

    return response.status(200).json(createdComment)
  }
}
