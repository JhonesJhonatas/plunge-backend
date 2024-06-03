import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreatePostUseCase } from '@post/use-cases/create-post-use-case'

export class CreatePostController {
  async handle(request: Request, response: Response) {
    const { content, userId, mediaUrl, topics } = request.body

    const createManyTopicsUseCase = container.resolve(CreatePostUseCase)

    const createdPost = await createManyTopicsUseCase.execute({
      content,
      userId,
      mediaUrl,
      topics,
    })

    return response.status(200).json(createdPost)
  }
}
