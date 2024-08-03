import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Post, User } from '@prisma/client'

import { AppModule } from '@/app.module'

import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { InMemoryPostRepository } from '@post/repositories/implementations/in-memory-post-repository'

import { UserRepository } from '@user/repositories/implementations/user-repository'
import { PostRepository } from '@post/repositories/implementations/post-repository'

describe('delete-post-controller', () => {
  let app: INestApplication

  let token: string

  let user: Omit<User, 'password'>
  let post: Post

  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryPostRepository: InMemoryPostRepository

  beforeAll(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPostRepository = new InMemoryPostRepository()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue(inMemoryUserRepository)
      .overrideProvider(PostRepository)
      .useValue(inMemoryPostRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    await app.init()

    token = jwt.sign(
      { id: 'test-user-id', email: 'test@example.com' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    )

    await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'User to Test Post Creation',
        nickName: '@usertotestpostcreation',
        bio: 'Rate Post Tester',
        email: 'usertotestpostcreation@email.com',
        password: '123456',
        avatarUrl: null,
      })
      .then((response) => {
        user = response.body
      })

    token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    )

    await request(app.getHttpServer())
      .post('/post')
      .send({
        content: 'Post to Rate',
        mediaUrl: null,
      })
      .set('Authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: user.id, email: user.email }))
      .then((response) => {
        post = response.body
      })
  })

  it('should not be able to delete post if user is not authenticated', async () => {
    await request(app.getHttpServer())
      .delete(`/post/${post.id}`)
      .send()
      .expect(401)
  })

  it('should be able to delete a post with success', async () => {
    await request(app.getHttpServer())
      .delete(`/post/${post.id}`)
      .send()
      .set('Authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: user.id, email: user.email }))
      .expect(200)
  })
})
