import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from '@user/use-cases/authenticate-user-use-case'

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const tokenResponse = await authenticateUserUseCase.execute({
      email,
      password,
    })

    return response.json(tokenResponse)
  }
}
