import { Topic } from '@prisma/client'

import { ICreateTopicDTO } from '@topic/dto/i-create-topic-dto'

export interface ITopicRepository {
  createMany(data: ICreateTopicDTO[]): Promise<number>
  findById(id: string): Promise<Topic | null>
  findAll(): Promise<Topic[]>
  delete(id: string): Promise<Topic>
}
