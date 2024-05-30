import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from '@user/use-cases/create-user-use-case'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { body } = request

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute(body)

    return response.status(201).json(user)
  }
}
