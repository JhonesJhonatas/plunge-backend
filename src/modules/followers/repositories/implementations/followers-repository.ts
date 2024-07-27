import { Followers, PrismaClient } from '@prisma/client'

import { IFollowsRepository } from '@followers/repositories/i-followers-repository'

import {
  ICreateFollowersDto,
  IDeleteFollowersDto,
  IEditFollowersDto,
} from '@followers/dto'

const prismaClient = new PrismaClient()

export class FollowersRepository implements IFollowsRepository {
  async create(params: ICreateFollowersDto): Promise<Followers> {
    return await prismaClient.followers.create({
      data: params,
    })
  }

  async edit({
    followedById,
    followingId,
    ...rest
  }: IEditFollowersDto): Promise<Followers> {
    return await prismaClient.followers.update({
      where: {
        followingId_followedById: {
          followingId,
          followedById,
        },
      },
      data: {
        ...rest,
      },
    })
  }

  async delete({
    followedById,
    followingId,
  }: IDeleteFollowersDto): Promise<Followers> {
    return await prismaClient.followers.delete({
      where: {
        followingId_followedById: {
          followingId,
          followedById,
        },
      },
    })
  }
}
