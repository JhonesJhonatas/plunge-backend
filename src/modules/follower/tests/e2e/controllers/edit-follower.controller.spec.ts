import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { AppModule } from '@/app.module'

import { InMemoryFollowerRepository } from '@follower/repositories/implementations/in-memory-follower-repository'
import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'

describe('edit-follower-controller', () => {
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

  it('should be able to edit a follower with success', () => {
    const followerToEdit = {
      id: '42a41049-3d20-4f4e-9565-20b4945c21da',
      status: 'DECLINED',
    }

    return request(app.getHttpServer())
      .put('/follower')
      .send(followerToEdit)
      .set('Authorization', `Bearer ${token}`)
      .set(
        'user',
        JSON.stringify({ id: 'test-user-id', email: 'test@example.com' }),
      )
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('followerId')
        expect(response.body).toHaveProperty('followingId')
        expect(response.body).toHaveProperty('createdAt')
      })
  })
})
