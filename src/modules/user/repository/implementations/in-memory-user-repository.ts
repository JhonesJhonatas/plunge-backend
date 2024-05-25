import { randomUUID } from 'crypto'
import { User } from '@prisma/client'

import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateUserDTO } from '../../dto/i-create-user-dto'
import { IEditUserDTO } from '../../dto/i-edit-user-dto'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

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
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
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
