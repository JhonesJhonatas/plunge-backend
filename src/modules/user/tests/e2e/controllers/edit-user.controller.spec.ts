import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'

import { AppModule } from '@/app.module'

import { InMemoryUserRepository } from '@/modules/user/repositories/implementations/in-memory-user-repository'
import { UserRepository } from '@/modules/user/repositories/implementations/user-repository'

describe('edit-user-controller', () => {
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

  it('should be able to edit user with success', () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      name: 'Bengalo',
    }

    return request(app.getHttpServer())
      .put('/user')
      .send(userToEdit)
      .set('Authorization', `Bearer ${token}`)
      .set(
        'user',
        JSON.stringify({ id: 'test-user-id', email: 'test@example.com' }),
      )
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('createdAt')
      })
  })
})
