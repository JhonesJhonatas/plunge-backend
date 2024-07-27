import { Injectable } from '@nestjs/common'

import { FollowersRepository } from '@followers/repositories/implementations/followers-repository'
import { DeleteFollowesValidation } from '@followers/validation'

@Injectable()
export class DeleteFollowersService {
  constructor(private readonly followersRepository: FollowersRepository) {}

  async execute(params: DeleteFollowesValidation) {
    return await this.followersRepository.delete(params)
  }
}
