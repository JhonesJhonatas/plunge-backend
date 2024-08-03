import { Injectable } from '@nestjs/common'

import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'

import { ICreateFollowerDto } from '@follower/dto'

@Injectable()
export class CreateFollowerService {
  constructor(private readonly followersRepository: FollowerRepository) {}

  async execute({ followerId, followingId }: ICreateFollowerDto) {
    return await this.followersRepository.create({ followerId, followingId })
  }
}
