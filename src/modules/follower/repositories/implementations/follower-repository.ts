import { Follower, PrismaClient } from '@prisma/client'

import { IFollowerRepository } from '@follower/repositories/i-follower-repository'

import {
  ICreateFollowerDto,
  IDeleteFollowerDto,
  IEditFollowerDto,
} from '@follower/dto'

const prismaClient = new PrismaClient()

export class FollowerRepository implements IFollowerRepository {
  async create(params: ICreateFollowerDto): Promise<Follower> {
    return await prismaClient.follower.create({
      data: params,
    })
  }

  async edit({ id, ...rest }: IEditFollowerDto): Promise<Follower> {
    return await prismaClient.follower.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    })
  }

  async delete({ id }: IDeleteFollowerDto): Promise<Follower> {
    return await prismaClient.follower.delete({
      where: {
        id,
      },
    })
  }
}
