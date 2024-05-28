import { inject, injectable } from 'tsyringe'

import { ITopicRepository } from '@topic/repository/i-topic-repository'

@injectable()
export class FindAllTopicsUseCase {
  constructor(
    @inject('TopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async execute() {
    return this.topicRepository.findAll()
  }
}
