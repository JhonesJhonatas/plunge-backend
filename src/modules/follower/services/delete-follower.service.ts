import { Injectable } from '@nestjs/common'

import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'
import { DeleteFollowerValidation } from '@follower/validation'

@Injectable()
export class DeleteFollowerService {
  constructor(private readonly followerRepository: FollowerRepository) {}

  async execute(params: DeleteFollowerValidation) {
    return await this.followerRepository.delete(params)
  }
}
