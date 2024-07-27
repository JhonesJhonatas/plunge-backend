import { Injectable } from '@nestjs/common'

import { FollowersRepository } from '@followers/repositories/implementations/followers-repository'
import { CreateFollowesValidation } from '@followers/validation'

@Injectable()
export class CreateFollowersService {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(params: CreateFollowesValidation) {
    return await this.followersRepository.create(params)
  }
}
