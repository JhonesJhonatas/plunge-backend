import { inject, injectable } from 'tsyringe'

import { ITopicRepository } from '@topic/repository/i-topic-repository'
import { AppError } from '@/errors/app-error'

@injectable()
export class DeleteTopicUseCase {
  constructor(
    @inject('TopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async execute(id: string) {
    const topic = await this.topicRepository.findById(id)

    if (!topic) {
      throw new AppError('Topic not found', 404)
    }

    return this.topicRepository.delete(id)
  }
}
