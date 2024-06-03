import { Topic, UserTopic } from '@prisma/client'

import { ICreateTopicDTO } from '@topic/dto/i-create-topic-dto'
import { ICreateUserTopicDTO } from '@topic/dto/user-topic/i-create-user-topic'

export interface ITopicRepository {
  createMany(data: ICreateTopicDTO[]): Promise<number>
  findById(id: string): Promise<Topic | null>
  findAll(): Promise<Topic[]>
  delete(id: string): Promise<Topic>

  createUserTopic({ topicId, userId }: ICreateUserTopicDTO): Promise<UserTopic>
  getUserTopics(userId: string): Promise<UserTopic[]>
}
