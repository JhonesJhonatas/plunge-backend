import { GetPostsUseCase } from '@/modules/post/use-cases/get-posts'
import { InMemoryPostRepository } from '@post/repository/implementations/in-memory-post-repository'

let getPostsUseCase: GetPostsUseCase

describe('get-post-use-case', () => {
  beforeEach(() => {
    const postRepository = new InMemoryPostRepository()
    getPostsUseCase = new GetPostsUseCase(postRepository)
  })

  it('should return a list of posts', async () => {
    const posts = await getPostsUseCase.execute()

    expect(posts).toBeInstanceOf(Array)
  })
})
