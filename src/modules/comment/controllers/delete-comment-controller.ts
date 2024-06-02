import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { DeleteCommentUseCase } from '@comment//use-cases/delete-comment-use-case'

export class DeleteCommentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase)

    const deletedComment = await deleteCommentUseCase.execute(id)

    return response.status(200).json(deletedComment)
  }
}
