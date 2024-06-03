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
    const [userAlreadyRegistered, userNameAlreadyTaken] = await Promise.all([
      this.userRepository.findByEmail(user.email),
      this.userRepository.findByUserName(user.userName),
    ])

    if (userAlreadyRegistered)
      throw new AppError('User already registered', 400)

    if (userNameAlreadyTaken) throw new AppError('Username already taken', 400)

    if (!user.topics.length)
      throw new AppError('At lest one topic is required', 400)

    const topicsWithoutDuplicates = Array.from(new Set(user.topics))

    for (const topicId of topicsWithoutDuplicates) {
      const topic = await this.topicRepository.findById(topicId)

      if (!topic) throw new AppError(`Topic ${topicId} does not exist`, 400)
    }

    const passwordHash = await hash(user.password, 8)

    const createdUser = await this.userRepository.create({
      ...user,
      password: passwordHash,
    })

    return createdUser
  }
}
