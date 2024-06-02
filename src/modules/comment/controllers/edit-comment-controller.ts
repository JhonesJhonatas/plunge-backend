import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { EditCommentUseCase } from '@comment/use-cases/edit-comment-use-case'

export class EditCommentController {
  async handle(request: Request, response: Response) {
    const { id, content } = request.body

    const editCommentUseCase = container.resolve(EditCommentUseCase)

    const editedComment = await editCommentUseCase.execute({ id, content })

    return response.status(200).json(editedComment)
  }
}
