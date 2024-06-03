import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { AppError } from '@/errors/app-error'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateUserDTO } from '@user/dto/i-create-user-dto'
import { ITopicRepository } from '@/modules/topic/repository/i-topic-repository'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TopicRepository')
    private topicRepository: ITopicRepository,
  ) {}

  async execute(user: ICreateUserDTO) {
    const { topics, ...rest } = user

    const [userAlreadyRegistered, userNameAlreadyTaken] = await Promise.all([
      this.userRepository.findByEmail(rest.email),
      this.userRepository.findByUserName(rest.userName),
    ])

    if (userAlreadyRegistered)
      throw new AppError('User already registered', 400)

    if (userNameAlreadyTaken) throw new AppError('Username already taken', 400)

    if (!topics) {
      throw new AppError('At lest one topic is required', 400)
    }

    const topicsWithoutDuplicates = Array.from(new Set(topics))

    for (const topicId of topicsWithoutDuplicates) {
      const topic = await this.topicRepository.findById(topicId)

      if (!topic) throw new AppError(`Topic ${topicId} does not exist`, 400)
    }

    const passwordHash = await hash(user.password, 8)

    const createdUser = await this.userRepository.create({
      ...rest,
      password: passwordHash,
    })

    for (const topicId of topicsWithoutDuplicates) {
      await this.topicRepository.createUserTopic({
        topicId,
        userId: createdUser.id,
      })
    }

    const createdTopics = await this.topicRepository.getUserTopics(
      createdUser.id,
    )

    const formattedTopics = createdTopics.map((topic) => topic.topicId)

    return {
      ...createdUser,
      topics: formattedTopics,
    }
  }
}
