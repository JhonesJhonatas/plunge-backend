import { User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { ICreateUserDto, IEditUserDto, ISearchUserDto } from '@user/dto'
import { IUserRepository } from '@user/repositories/i-user-repository'

export class InMemoryRepository implements IUserRepository {
  private users: User[] = []

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

  async search(params: ISearchUserDto): Promise<User[]> {
    return this.users.filter((user) => {
      if (params.name && !user.name.includes(params.name)) {
        return false
      }

      if (params.email && !user.email.includes(params.email)) {
        return false
      }

      return true
    })
  }
}
