import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { EditPostUseCase } from '../use-cases/edit-post-use-case'

export class EditPostController {
  async handle(request: Request, response: Response) {
    const { id, content, mediaUrl } = request.body

    const editPostUseCase = container.resolve(EditPostUseCase)

    const editedPost = await editPostUseCase.execute({
      id,
      content,
      mediaUrl,
    })

    return response.status(200).json(editedPost)
  }
}
