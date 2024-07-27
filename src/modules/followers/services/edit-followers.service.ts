import { Injectable } from '@nestjs/common'

import { FollowersRepository } from '@followers/repositories/implementations/followers-repository'
import { EditFollowesValidation } from '@followers/validation'

@Injectable()
export class EditFollowersService {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(params: EditFollowesValidation) {
    return await this.followersRepository.edit(params)
  }
}
