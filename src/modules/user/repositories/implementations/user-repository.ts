import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from '@user/repositories/i-user-repository'

import {
  ICreateUserDto,
  IDeleteUserDto,
  IEditUserDto,
  IGetProfileDataResponseDto,
} from '@user/dto'

const prismaClient = new PrismaClient()
export class UserRepository implements IUserRepository {
  async create(params: ICreateUserDto): Promise<User> {
    return await prismaClient.user.create({
      data: params,
    })
  }

  async edit(params: IEditUserDto): Promise<User> {
    const { id, ...rest } = params

    return await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    })
  }

  async findByNickName(nickName: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: {
        nickName,
      },
    })
  }

  async findAll(): Promise<User[]> {
    return await prismaClient.user.findMany()
  }

  async getProfileData(
    nickName: string,
  ): Promise<IGetProfileDataResponseDto | null> {
    return await prismaClient.user.findUnique({
      where: {
        nickName,
      },
      include: {
        posts: {
          include: {
            Like: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    nickName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
        followers: {
          include: {
            following: {
              select: {
                id: true,
                name: true,
                nickName: true,
                avatarUrl: true,
              },
            },
          },
        },
        following: {
          include: {
            follower: {
              select: {
                id: true,
                name: true,
                nickName: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    })
  }

  async searchByName(name: string): Promise<User[]> {
    return await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }

  async searchByEmail(email: string): Promise<User[]> {
    return await prismaClient.user.findMany({
      where: {
        email: {
          contains: email,
        },
      },
    })
  }

  async searchByNickName(nickName: string): Promise<User[]> {
    return await prismaClient.user.findMany({
      where: {
        nickName: {
          contains: nickName,
        },
      },
    })
  }

  async delete(params: IDeleteUserDto) {
    const { id } = params

    return await prismaClient.user.delete({
      where: {
        id,
      },
    })
  }
}
