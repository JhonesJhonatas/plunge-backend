import { Module } from '@nestjs/common'

import { FollowerRepository } from '@follower/repositories/implementations/follower-repository'

import {
  CreateFollowerController,
  DeleteFollowerController,
  EditFollowerController,
} from '@follower/controllers'

import {
  CreateFollowerService,
  DeleteFollowerService,
  EditFollowerService,
} from '@follower/services'

@Module({
  controllers: [
    CreateFollowerController,
    DeleteFollowerController,
    EditFollowerController,
  ],
  providers: [
    FollowerRepository,
    CreateFollowerService,
    DeleteFollowerService,
    EditFollowerService,
  ],
  exports: [FollowerRepository],
})
export class FollowerModule {}
