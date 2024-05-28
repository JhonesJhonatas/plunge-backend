import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { EditUserUseCase } from '@user/use-cases/edit-user'

export class EditUserController {
  async handle(request: Request, response: Response) {
    const { body } = request

    const editUserUseCase = container.resolve(EditUserUseCase)

    const user = await editUserUseCase.execute(body)

    return response.status(201).json(user)
  }
}
