import { InMemoryTopicRepository } from '@topic/repository/implementations/in-memory-topic-repository'
import { DeleteTopicUseCase } from '@/modules/topic/use-cases/delete-topic-use-case'
import { AppError } from '@/errors/app-error'

const topicRepository = new InMemoryTopicRepository()
const deleteTopicUseCase = new DeleteTopicUseCase(topicRepository)

describe('delete-topic-use-case', () => {
  it('should be able to delete topic', async () => {
    const deletedTopic = await deleteTopicUseCase.execute(
      'd51feab3-b0df-468f-928a-b06e11776bed',
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
