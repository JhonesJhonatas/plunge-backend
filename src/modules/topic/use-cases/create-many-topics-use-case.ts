import { inject, injectable } from 'tsyringe'

import { ITopicRepository } from '@topic/repository/i-topic-repository'

type IRequest = {
  topics: string[]
}

@injectable()
export class CreateManyTopicsUseCase {
  constructor(
    @inject('TopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async execute({ topics }: IRequest) {
    const formattedProps = topics.map((prop) => ({ title: prop }))

    return this.topicRepository.createMany(formattedProps)
  }
}
