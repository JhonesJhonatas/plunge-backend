import { CreateManyTopicsUseCase } from '@topic/use-cases/create-many-topics-use-case'
import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'

const topicRepository = new InMemoryTopicRepository()
const createManyTopicsUseCase = new CreateManyTopicsUseCase(topicRepository)

describe('create-many-topics-use-case', () => {
  it('should be able to create many topics', async () => {
    const topicsToCreate = [
      'React',
      'NodeJs',
      'Typescript',
      'Javascript',
      'PostgreSQL',
    ]

    const createdTopicsCount = await createManyTopicsUseCase.execute({
      topics: topicsToCreate,
    })

    expect(createdTopicsCount).toBe(topicsToCreate.length)
  })
})
