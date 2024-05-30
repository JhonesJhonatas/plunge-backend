import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { DeletePostUseCase } from '@post/use-cases/delete-post'

export class DeletePostController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deletePostUseCase = container.resolve(DeletePostUseCase)

    const deletedPost = await deletePostUseCase.execute(id)

    return response.status(200).json(deletedPost)
  }
}
