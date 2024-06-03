import { PrismaClient, Topic, UserTopic } from '@prisma/client'

import { ITopicRepository } from '@topic/repository/i-topic-repository'
import { ICreateTopicDTO } from '@topic/dto/i-create-topic-dto'
import { ICreateUserTopicDTO } from '../../dto/user-topic/i-create-user-topic'

const prismaClient = new PrismaClient()

export class TopicRepository implements ITopicRepository {
  async createMany(data: ICreateTopicDTO[]): Promise<number> {
    const createdTopics = await prismaClient.topic.createMany({
      data,
    })

    return createdTopics.count
  }

  async findById(id: string): Promise<Topic | null> {
    const topic = await prismaClient.topic.findUnique({
      where: {
        id,
      },
    })

    return topic
  }

  async findAll(): Promise<Topic[]> {
    const topics = await prismaClient.topic.findMany()

    return topics
  }

  async delete(id: string): Promise<Topic> {
    const deletedTopic = await prismaClient.topic.delete({
      where: {
        id,
      },
    })

    return deletedTopic
  }

  async createUserTopic({
    topicId,
    userId,
  }: ICreateUserTopicDTO): Promise<UserTopic> {
    return await prismaClient.userTopic.create({
      data: {
        topicId,
        userId,
      },
    })
  }

  async getUserTopics(userId: string): Promise<UserTopic[]> {
    return await prismaClient.userTopic.findMany({
      where: {
        userId,
      },
    })
  }
}
