import { Injectable } from '@nestjs/common'

import { FollowersRepository } from '@followers/repositories/implementations/followers-repository'

import { ICreateFollowersDto } from '@followers/dto'

@Injectable()
export class CreateFollowersService {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(params: ICreateFollowersDto) {
    return await this.followersRepository.create(params)
  }
}
