import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { GetCommentsUseCase } from '@comment/use-cases/get-comments-use-case'

export class GetCommentsController {
  async handle(request: Request, response: Response) {
    const getCommentsUseCase = container.resolve(GetCommentsUseCase)

    const comments = await getCommentsUseCase.execute()

    return response.status(200).json(comments)
  }
}
