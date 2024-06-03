import { randomUUID } from 'crypto'

import { Topic } from '@prisma/client'

import { ITopicRepository } from '@topic/repository/i-topic-repository'
import { ICreateTopicDTO } from '@topic/dto/i-create-topic-dto'

export class InMemoryTopicRepository implements ITopicRepository {
  private topics: Topic[] = [
    {
      id: '4728fa8e-92ad-46ca-9322-0d333f11c11f',
      title: 'React',
      createdAt: new Date('2024-05-25T06:33:34.631Z'),
      updatedAt: new Date('2024-05-28T00:36:23.388Z'),
    },
  ]

  createMany(data: ICreateTopicDTO[]): Promise<number> {
    const topicsToCreate = data.map((topic) => ({
      id: randomUUID(),
      title: topic.title,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    this.topics.push(...topicsToCreate)

    return Promise.resolve(topicsToCreate.length)
  }

  findById(id: string): Promise<Topic | null> {
    const topic = this.topics.find((topic) => topic.id === id)

    return Promise.resolve(topic || null)
  }

  findAll(): Promise<Topic[]> {
    return Promise.resolve(this.topics)
  }

  delete(id: string): Promise<Topic> {
    const topicIndex = this.topics.findIndex((topic) => topic.id === id)

    const deletedTopic = this.topics.splice(topicIndex, 1)[0]

    return Promise.resolve(deletedTopic)
  }
}
