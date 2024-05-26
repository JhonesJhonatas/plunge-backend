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
    const index = this.users.findIndex((u) => u.id === user.id)

    if (index === -1) {
      throw new Error('User not found')
    }

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

    if (index === -1) {
      throw new Error('User not found')
    }

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
