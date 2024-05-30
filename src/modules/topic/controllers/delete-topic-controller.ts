import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteTopicUseCase } from '../use-cases/delete-topic-use-case'

export class DeleteTopicController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteTopicUseCase = container.resolve(DeleteTopicUseCase)

    const deletedTopic = await deleteTopicUseCase.execute(id)

    return response.status(200).json(deletedTopic)
  }
}
