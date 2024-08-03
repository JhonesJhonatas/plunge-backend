import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { AppModule } from '@/app.module'

import { InMemoryUserRepository } from '@/modules/user/repositories/implementations/in-memory-user-repository'
import { UserRepository } from '@/modules/user/repositories/implementations/user-repository'

describe('search-user-controller', () => {
  let app: INestApplication
  let inMemoryUserRepository: InMemoryUserRepository
  let token: string

  beforeAll(async () => {
    inMemoryUserRepository = new InMemoryUserRepository()

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue(inMemoryUserRepository)
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

  it('should be able to search user by name', () => {
    return request(app.getHttpServer())
      .get('/user')
      .query({ name: 'User' })
      .send()
      .set('Authorization', `Bearer ${token}`)
      .set(
        'user',
        JSON.stringify({ id: 'test-user-id', email: 'test@example.com' }),
      )
      .expect(200)
      .expect((response) => {
        response.body.forEach((user) => {
          expect(user).toHaveProperty('id')
          expect(user).toHaveProperty('name')
          expect(user).toHaveProperty('email')
          expect(user).toHaveProperty('avatarUrl')
          expect(user).toHaveProperty('createdAt')
        })
      })
  })

  it('should be able to search user by email', () => {
    return request(app.getHttpServer())
      .get('/user')
      .query({ email: 'userinmemory' })
      .send()
      .set('Authorization', `Bearer ${token}`)
      .set(
        'user',
        JSON.stringify({ id: 'test-user-id', email: 'test@example.com' }),
      )
      .expect(200)
      .expect((response) => {
        response.body.forEach((user) => {
          expect(user).toHaveProperty('id')
          expect(user).toHaveProperty('name')
          expect(user).toHaveProperty('email')
          expect(user).toHaveProperty('avatarUrl')
          expect(user).toHaveProperty('createdAt')
        })
      })
  })
})
