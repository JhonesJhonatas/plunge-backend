import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'
import { FindAllTopicsUseCase } from '@/modules/topic/use-cases/find-all-topics-use-case'

const topicRepository = new InMemoryTopicRepository()
const findAllTopicsUseCase = new FindAllTopicsUseCase(topicRepository)

describe('find-all-topics-use-case', () => {
  it('should be able to find all topics', async () => {
    const topics = await findAllTopicsUseCase.execute()

    expect(topics).toBeInstanceOf(Array)
  })
})
