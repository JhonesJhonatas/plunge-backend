import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { FindAllUsersUseCase } from '@user/use-cases/find-all-users-use-case'

export class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const findAllUsersUseCase = container.resolve(FindAllUsersUseCase)

    const users = await findAllUsersUseCase.execute()

    return response.status(201).json(users)
  }
}
