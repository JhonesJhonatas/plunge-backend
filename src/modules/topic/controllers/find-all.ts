import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindAllTopicsUseCase } from '../use-cases/find-all'

export class FindAllTopicsController {
  async handle(request: Request, response: Response) {
    const findAllUsersUseCase = container.resolve(FindAllTopicsUseCase)

    const topics = await findAllUsersUseCase.execute()

    return response.status(201).json(topics)
  }
}
