import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Post, User } from '@prisma/client'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { AppModule } from '@/app.module'

import { UserRepository } from '@user/repositories/implementations/user-repository'
import { PostRepository } from '@/modules/post/repositories/implementations/post-repository'
import { LikeRepository } from '@/modules/like/repositories/implementations/like-repository'

import { InMemoryLikeRepository } from '@/modules/like/repositories/implementations/in-memory-like-repository'
import { InMemoryUserRepository } from '@/modules/user/repositories/implementations/in-memory-user-repository'
import { InMemoryPostRepository } from '@/modules/post/repositories/implementations/in-memory-post-repository'

describe('rate-post-controller', () => {
  let app: INestApplication

  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryPostRepository: InMemoryPostRepository
  let inMemoryLikeRepository: InMemoryLikeRepository

  let user: Omit<User, 'password'>
  let post: Post

  let token: string

  beforeAll(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPostRepository = new InMemoryPostRepository()
    inMemoryLikeRepository = new InMemoryLikeRepository()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue(inMemoryUserRepository)
      .overrideProvider(PostRepository)
      .useValue(inMemoryPostRepository)
      .overrideProvider(LikeRepository)
      .useValue(inMemoryLikeRepository)
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

    await request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'Rate Post Tester',
        nickName: '@usercreatedtorate',
        bio: 'Rate Post Tester',
        email: 'usercreatedtorate@email.com',
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

  it('should not be able to rate a post if user is not authenticated', async () => {
    return await request(app.getHttpServer())
      .post('/like/rate-post')
      .send({
        postId: post.id,
        like: true,
      })
      .expect(401)
  })

  it('should not be able to rate a post that does not exist', async () => {
    return await request(app.getHttpServer())
      .post('/like/rate-post')
      .send({
        postId: 'unextist post',
        like: true,
      })
      .set('Authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: user.id, email: user.email }))
      .expect(404)
  })

  it('should be able to rate a post', async () => {
    return await request(app.getHttpServer())
      .post('/like/rate-post')
      .send({
        postId: post.id,
        like: true,
      })
      .set('Authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: user.id, email: user.email }))
      .expect(201)
  })
})
