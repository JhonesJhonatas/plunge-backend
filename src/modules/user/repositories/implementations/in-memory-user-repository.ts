import { User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { ICreateUserDto, IDeleteUserDto, IEditUserDto } from '@user/dto'
import { IUserRepository } from '@user/repositories/i-user-repository'

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'userinmemory@email.com',
      name: 'User In Memory',
      avatarUrl: 'avatar',
      bio: '',
      nickName: 'userInMemory',
      password: '$2b$08$6xsbr4RE9dIqTKMo6iZKOuHYx7t.abub/s9eTfQzHfeESigJNV4Tu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'usertotestauth@email.com',
      name: 'User to Test Auth',
      bio: '',
      nickName: 'userToTest',
      avatarUrl: 'vatar',
      password: '$2b$08$PdpZSUHX.9TzyfTzOLjWSuxvSq2ZNH8TGBrjJgq90O7IYg29CNR2G',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  async create(params: ICreateUserDto): Promise<User> {
    const user = {
      id: randomUUID(),
      avatarUrl: null,
      bio: params.bio || null,
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

  async findByNickName(nickName: string): Promise<User | null> {
    return this.users.find((user) => user.nickName === nickName) || null
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

  async getProfileData(nickName: string): Promise<User | null> {
    return this.users.find((user) => user.nickName === nickName) || null
  }

  async searchByName(name: string): Promise<User[]> {
    return this.users.filter((user) => user.name.includes(name))
  }

  async searchByEmail(email: string): Promise<User[]> {
    return this.users.filter((user) => user.email.includes(email))
  }

  async searchByNickName(nickName: string): Promise<User[]> {
    return this.users.filter((user) => user.nickName.includes(nickName))
  }

  async delete(params: IDeleteUserDto): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === params.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const user = this.users[userIndex]

    this.users.splice(userIndex, 1)

    return user
  }
}
