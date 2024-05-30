import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreatePostUseCase } from '@post/use-cases/create-post'

export class CreatePostController {
  async handle(request: Request, response: Response) {
    const { content, userId, mediaUrl } = request.body

    const createManyTopicsUseCase = container.resolve(CreatePostUseCase)

    const createdPost = await createManyTopicsUseCase.execute({
      content,
      userId,
      mediaUrl,
    })

    return response.status(200).json(createdPost)
  }
}
