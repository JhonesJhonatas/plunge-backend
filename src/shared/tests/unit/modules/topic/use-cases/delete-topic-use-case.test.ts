import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'
import { DeleteTopicUseCase } from '@/modules/topic/use-cases/delete-topic-use-case'
import { AppError } from '@/errors/app-error'

const topicRepository = new InMemoryTopicRepository()
const deleteTopicUseCase = new DeleteTopicUseCase(topicRepository)

describe('delete-topic-use-case', () => {
  it('should be able to delete topic', async () => {
    const deletedTopic = await deleteTopicUseCase.execute(
      '4728fa8e-92ad-46ca-9322-0d333f11c11f',
    )

    expect(deletedTopic).toHaveProperty('id')
    expect(deletedTopic).toHaveProperty('title')
    expect(deletedTopic).toHaveProperty('createdAt')
    expect(deletedTopic).toHaveProperty('updatedAt')
  })

  it('should not be able to delete topic that does not exist', async () => {
    await expect(deleteTopicUseCase.execute('123123123')).rejects.toEqual(
      new AppError('Topic not found', 404),
    )
  })
})
