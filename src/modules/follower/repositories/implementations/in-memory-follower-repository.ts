import { randomUUID } from 'crypto'

import { Follower } from '@prisma/client'

import { IFollowerRepository } from '@follower/repositories/i-follower-repository'

import {
  ICreateFollowerDto,
  IDeleteFollowerDto,
  IEditFollowerDto,
} from '@follower/dto'

export class InMemoryFollowerRepository implements IFollowerRepository {
  private followers: Follower[] = [
    {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      status: 'ACCEPTED',
      followerId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      followingId: '42a50108-3d20-4f4e-9565-20b4945c21da',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  async create({
    followerId,
    followingId,
  }: ICreateFollowerDto): Promise<Follower> {
    const randomId = randomUUID()

    this.followers.push({
      id: randomId,
      status: 'PENDING',
      followerId,
      followingId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const follower = this.followers.find((follower) => follower.id === randomId)

    return follower
  }

  async edit(params: IEditFollowerDto): Promise<Follower> {
    const followerIndex = this.followers.findIndex(
      (follower) => follower.id === params.id,
    )

    this.followers[followerIndex] = {
      ...this.followers[followerIndex],
      ...params,
      updatedAt: new Date(),
    }

    return this.followers[followerIndex]
  }

  async delete(params: IDeleteFollowerDto): Promise<Follower> {
    const followerIndex = this.followers.findIndex(
      (follower) => follower.id === params.id,
    )

    const follower = this.followers[followerIndex]

    this.followers.splice(followerIndex, 1)

    return follower
  }
}
