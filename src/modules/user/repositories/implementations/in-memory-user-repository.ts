import { User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { ICreateUserDto, IEditUserDto } from '@user/dto'
import { IUserRepository } from '@user/repositories/i-user-repository'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'userinmemory@email.com',
      name: 'User In Memory',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  async create(params: ICreateUserDto): Promise<User> {
    const user = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...params,
    }

    this.users.push(user)

    return this.users[this.users.length - 1]
  }

  async edit(params: IEditUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === params.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...params,
      updatedAt: new Date(),
    }

    return this.users[userIndex]
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async searchByName(name: string): Promise<User[]> {
    return this.users.filter((user) => user.name.includes(name))
  }

  async searchByEmail(email: string): Promise<User[]> {
    return this.users.filter((user) => user.email.includes(email))
  }
}
