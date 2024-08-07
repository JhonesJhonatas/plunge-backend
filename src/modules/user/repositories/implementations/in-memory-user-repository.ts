import { User } from '@prisma/client'
import { randomUUID } from 'crypto'

import {
  ICreateUserDto,
  IDeleteUserDto,
  IEditUserDto,
  IGetProfileDataResponseDto,
} from '@user/dto'
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
    {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'userwithcorrectnickmane@email.com',
      name: 'User to Test Auth',
      bio: '',
      nickName: '@correctnickname',
      avatarUrl: 'vatar',
      password: '$2b$08$PdpZSUHX.9TzyfTzOLjWSuxvSq2ZNH8TGBrjJgq90O7IYg29CNR2G',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '42a091901-3d20-4f4e-9565-20b4945c21da',
      email: 'usetodelete@email.com',
      name: 'User to Test Auth',
      bio: 'usetodelete',
      nickName: '@usetodelete',
      avatarUrl: 'usetodelete',
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

  async getProfileData(
    nickName: string,
  ): Promise<IGetProfileDataResponseDto | null> {
    const user = this.users.find((user) => user.nickName === nickName)

    if (!user) {
      return null
    }

    return {
      ...user,
      posts: [],
      following: [
        {
          id: '42a50108-3d20-4f4e-9565-20b4945c21da',
          status: 'ACCEPTED',
          followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          createdAt: new Date(),
          updatedAt: new Date(),
          follower: {
            id: '42a50108-3d20-4f4e-9565-20b4945c21da',
            name: 'User In Memory',
            nickName: 'userInMemory',
            avatarUrl: 'avatar',
          },
        },
        {
          id: '42a50108-3d20-4f4e-9565-20b4945c21da',
          status: 'PENDING',
          followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          createdAt: new Date(),
          updatedAt: new Date(),
          follower: {
            id: '42a50108-3d20-4f4e-9565-20b4945c21da',
            name: 'User In Memory',
            nickName: 'userInMemory',
            avatarUrl: 'avatar',
          },
        },
      ],
      followers: [
        {
          id: '42a50108-3d20-4f4e-9565-20b4945c21da',
          status: 'ACCEPTED',
          followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          createdAt: new Date(),
          updatedAt: new Date(),
          following: {
            id: '42a50108-3d20-4f4e-9565-20b4945c21da',
            name: 'User In Memory',
            nickName: 'userInMemory',
            avatarUrl: 'avatar',
          },
        },
        {
          id: '42a50108-3d20-4f4e-9565-20b4945c21da',
          status: 'PENDING',
          followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
          createdAt: new Date(),
          updatedAt: new Date(),
          following: {
            id: '42a50108-3d20-4f4e-9565-20b4945c21da',
            name: 'User In Memory',
            nickName: 'userInMemory',
            avatarUrl: 'avatar',
          },
        },
      ],
    }
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
