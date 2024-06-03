import { PrismaClient, Topic } from '@prisma/client'

import { ITopicRepository } from '@topic/repository/i-topic-repository'
import { ICreateTopicDTO } from '@topic/dto/i-create-topic-dto'

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
}
