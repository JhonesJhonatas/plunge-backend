import { Module } from '@nestjs/common'

import { FollowersRepository } from '@followers/repositories/implementations/followers-repository'

import {
  CreateFollowersController,
  DeleteFollowersController,
  EditFollowersController,
} from '@followers/controllers'

import {
  CreateFollowersService,
  DeleteFollowersService,
  EditFollowersService,
} from '@followers/services'

@Module({
  controllers: [
    CreateFollowersController,
    DeleteFollowersController,
    EditFollowersController,
  ],
  providers: [
    FollowersRepository,
    CreateFollowersService,
    DeleteFollowersService,
    EditFollowersService,
  ],
})
export class FollowersModule {}
