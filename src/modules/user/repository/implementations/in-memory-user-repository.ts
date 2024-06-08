import { randomUUID } from 'crypto'
import { User } from '@prisma/client'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateUserDTO } from '@user/dto/i-create-user-dto'
import { IEditUserDTO } from '@user/dto/i-edit-user-dto'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: 'd51feab3-b0df-468f-928a-b06e11776bed',
      name: 'Jhones Jhonatas',
      userName: 'jhonesjhonatas',
      email: 'jhones.jhonatas@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24T00:00:00.000Z'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      createdAt: new Date('2024-05-25T06:33:34.631Z'),
      updatedAt: new Date('2024-05-28T00:36:23.388Z'),
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    },
    {
      id: 'd51feab3-b0df-468f-928a-b06e11776bes',
      name: 'Blitz Wolf',
      userName: 'blitzwolf',
      email: 'blitzwolf@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24T00:00:00.000Z'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      createdAt: new Date('2024-05-25T06:33:34.631Z'),
      updatedAt: new Date('2024-05-28T00:36:23.388Z'),
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    },
    {
      id: 'd51feab3-b0df-468f-928a-b06e11776bes',
      name: 'Auth Test',
      userName: 'authTest',
      email: 'auth-test@example.com',
      password: '$2b$08$Htotk7hbwkX1cmCZUqDVOuQ7ik8FHy7E2OOAjkffIA4TUrpmBLloO',
      birthDate: new Date('1995-12-24T00:00:00.000Z'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      createdAt: new Date('2024-05-25T06:33:34.631Z'),
      updatedAt: new Date('2024-05-28T00:36:23.388Z'),
      topics: ['4728fa8e-92ad-46ca-9322-0d333f11c11f'],
    },
  ]

  create(user: ICreateUserDTO): Promise<User> {
    const userToCreate = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: user.avatarUrl || null,
      coverUrl: user.coverUrl || null,
      ...user,
    }

    this.users.push(userToCreate)

    const createdUser = this.users.find((u) => u.id === userToCreate.id)

    return Promise.resolve(createdUser as User)
  }

  edit(user: IEditUserDTO): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id)

    const userToEdit = {
      ...this.users[index],
      ...user,
      updatedAt: new Date(),
    }

    this.users[index] = userToEdit

    const editedUser = this.users.find((u) => u.id === user.id)

    return Promise.resolve(editedUser as User)
  }

  delete(id: string): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id)

    const userToDelete = this.users[index]

    this.users.splice(index, 1)

    return Promise.resolve(userToDelete)
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users)
  }

  findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id)

    return Promise.resolve(user || null)
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email)

    return Promise.resolve(user || null)
  }

  findByUserName(userName: string): Promise<User | null> {
    const user = this.users.find((u) => u.userName === userName)

    return Promise.resolve(user || null)
  }
}
