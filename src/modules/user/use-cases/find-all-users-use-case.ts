import { inject, injectable } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ITopicRepository } from '@topic/repository/i-topic-repository'

@injectable()
export class FindAllUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll()

    const userWithTopics = await Promise.all([
      ...users.map(async (user) => {
        const topics = await this.topicRepository.getUserTopics(user.id)
        const topicsIds = topics.map((topic) => topic.topicId)

        return { ...user, topics: topicsIds }
      }),
    ])

    return userWithTopics
  }
}
