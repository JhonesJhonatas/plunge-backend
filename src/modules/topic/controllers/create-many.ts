import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateManyTopicsUseCase } from '../use-cases/create-many'

export class CreateManyTopicsController {
  async handle(request: Request, response: Response) {
    const { topics } = request.body

    const createManyTopicsUseCase = container.resolve(CreateManyTopicsUseCase)

    const createdTopics = await createManyTopicsUseCase.execute({ topics })

    return response.status(200).json(createdTopics)
  }
}
