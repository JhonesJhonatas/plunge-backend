import { Injectable } from '@nestjs/common'

import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'
import { EditFollowerValidation } from '@follower/validation'

@Injectable()
export class EditFollowerService {
  constructor(private readonly followersRepository: FollowerRepository) {}

  async execute(params: EditFollowerValidation) {
    return await this.followersRepository.edit(params)
  }
}
