import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from '@user/use-cases/create-user'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const requestBody = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute(requestBody)

    return response.status(201).json(user)
  }
}
