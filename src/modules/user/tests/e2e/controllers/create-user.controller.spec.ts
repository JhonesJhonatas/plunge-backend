import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { UserRepository } from '@user/repositories/implementations/user-repository'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { AppModule } from '@/app.module'

describe('create-user-controller', () => {
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

  it('should no be able to create user without name', () => {
    const userToCreate = {
      name: null,
      nickName: '@tester',
      bio: 'test bio',
      email: 'userinmemory@email.com',
      password: '123456',
      avatarUrl: null,
    }

    return request(app.getHttpServer())
      .post('/user')
      .send(userToCreate)
      .expect(400)
      .expect({
        message: ['name must be a string'],
        error: 'Bad Request',
        statusCode: 400,
      })
  })
  it.todo('should no be able to create user without nickName')
  it.todo('should no be able to create user with incorrect nickName')
  it.todo('should no be able to create user without email')
  it.todo('should no be able to create user without password')

  it('should not be able to create user with an email that is already registered', () => {
    const userToCreate = {
      name: 'tester',
      nickName: '@tester',
      bio: 'test bio',
      email: 'userinmemory@email.com',
      password: '123456',
      avatarUrl: null,
    }

    return request(app.getHttpServer())
      .post('/user')
      .send(userToCreate)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Email already registered',
      })
  })

  it('should not be able to create user with an nickName that is already registered', () => {
    const userToCreate = {
      name: 'tester',
      nickName: '@correctnickname',
      bio: 'test bio',
      email: 'e2ttester@email.com',
      password: '123456',
      avatarUrl: null,
    }

    return request(app.getHttpServer())
      .post('/user')
      .send(userToCreate)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'NickName already registered',
      })
  })
})
