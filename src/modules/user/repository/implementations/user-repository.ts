import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from '@user/repository/i-user-repository'

import { ICreateUserDTO } from '@user/dto/i-create-user-dto'
import { IEditUserDTO } from '@user/dto/i-edit-user-dto'

export class UserRepository implements IUserRepository {
  private prismaClient = new PrismaClient()

  async create(user: ICreateUserDTO): Promise<User> {
    return await this.prismaClient.user.create({ data: user })
  }

  async edit(user: IEditUserDTO): Promise<User> {
    const { id, ...data } = user

    return await this.prismaClient.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    return await this.prismaClient.user.delete({ where: { id } })
  }

  async findAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaClient.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaClient.user.findUnique({ where: { email } })
  }

  async findByUserName(userName: string): Promise<User | null> {
    return await this.prismaClient.user.findUnique({ where: { userName } })
  }
}
