import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { UserRepository } from '@user/repositories/implementations/user-repository'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { AppModule } from '@/app.module'

describe('sign-in-controller', () => {
  let app: INestApplication
  let inMemoryUserRepository: InMemoryUserRepository

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
  })

  it('should no be able to sign in with incorrect credentials', () => {
    const credentials = {
      email: 'userinmemory@email.com',
      password: '123123',
    }

    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(credentials)
      .expect(401)
  })

  it('should be able to sign in with correct credentials', () => {
    const credentials = {
      email: 'usertotestauth@email.com',
      password: '123456',
    }

    return request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(credentials)
      .expect(201)
  })
})
