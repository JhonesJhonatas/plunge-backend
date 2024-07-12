import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from '@user/repositories/i-user-repository'

import { ICreateUserDto, IEditUserDto, ISearchUserDto } from '@user/dto'

export class UserRepository implements IUserRepository {
  private prismaClient = new PrismaClient()

  async create(params: ICreateUserDto): Promise<User> {
    return await this.prismaClient.user.create({
      data: params,
    })
  }

  async edit(params: IEditUserDto): Promise<User> {
    const { id, ...rest } = params

    return await this.prismaClient.user.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    })
  }

  async search(params: ISearchUserDto): Promise<User[]> {
    const { name, email } = params

    const whereClause = {}

    if (name) {
      Object.assign(whereClause, {
        name: {
          contains: name,
        },
      })
    }

    if (email) {
      Object.assign(whereClause, {
        email: {
          contains: email,
        },
      })
    }

    return await this.prismaClient.user.findMany({
      where: whereClause,
    })
  }
}
