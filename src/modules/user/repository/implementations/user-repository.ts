import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from '@user/repository/i-user-repository'

import { ICreateUserDTO } from '@user/dto/i-create-user-dto'
import { IEditUserDTO } from '@user/dto/i-edit-user-dto'

const prismaClient = new PrismaClient()

export class UserRepository implements IUserRepository {
  async create(user: ICreateUserDTO): Promise<User> {
    return await prismaClient.user.create({ data: user })
  }

  async edit(user: IEditUserDTO): Promise<User> {
    const { id, ...data } = user

    return await prismaClient.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<User> {
    return await prismaClient.user.delete({ where: { id } })
  }

  async findAll(): Promise<User[]> {
    return await prismaClient.user.findMany()
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { email } })
  }

  async findByUserName(userName: string): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { userName } })
  }
}
