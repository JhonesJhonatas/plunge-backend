import { container } from 'tsyringe'
import { Request, Response } from 'express'

import { GetPostsUseCase } from '../use-cases/get-posts'

export class GetPostsController {
  async handle(request: Request, response: Response) {
    const getPostsUsecase = container.resolve(GetPostsUseCase)

    const posts = await getPostsUsecase.execute()

    return response.status(200).json(posts)
  }
}
