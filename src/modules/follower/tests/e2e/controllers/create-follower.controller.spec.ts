import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { AppModule } from '@/app.module'

import { InMemoryFollowerRepository } from '@follower/repositories/implementations/in-memory-follower-repository'
import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'

describe('create-follower-controller', () => {
  let app: INestApplication
  let inMemoryFollowerRepository: InMemoryFollowerRepository
  let token: string

  beforeAll(async () => {
    inMemoryFollowerRepository = new InMemoryFollowerRepository()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FollowerRepository)
      .useValue(inMemoryFollowerRepository)
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
  })

  it('should be able to create a follower with success', () => {
    const followerToCreate = {
      followingId: '123123123123',
    }

    return request(app.getHttpServer())
      .post('/follower')
      .send(followerToCreate)
      .set('Authorization', `Bearer ${token}`)
      .set(
        'user',
        JSON.stringify({ id: 'test-user-id', email: 'test@example.com' }),
      )
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('followerId')
        expect(response.body).toHaveProperty('followingId')
        expect(response.body).toHaveProperty('createdAt')
      })
  })
})
