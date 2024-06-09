import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { CreatePostUseCase } from '@post/use-cases/create-post-use-case'

export class CreatePostController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const { content, mediaUrl, topics } = request.body

    const createManyTopicsUseCase = container.resolve(CreatePostUseCase)

    const createdPost = await createManyTopicsUseCase.execute({
      content,
      userId: id,
      mediaUrl,
      topics,
    })

    return response.status(200).json(createdPost)
  }
}
