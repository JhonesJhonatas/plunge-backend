import { Module } from '@nestjs/common'

import {
  CreateUserController,
  DeleteUserController,
  EditUserController,
  SearchUserController,
} from '@user/controllers'

import {
  CreateUserService,
  DeleteUserService,
  EditUserService,
  GetProfileDataService,
  SearchUserService,
} from '@user/services'

import { UserRepository } from './repositories/implementations/user-repository'
import { GetProfileDataController } from './controllers/get-profile-data.controller'

@Module({
  controllers: [
    CreateUserController,
    DeleteUserController,
    EditUserController,
    SearchUserController,
    GetProfileDataController,
  ],
  providers: [
    UserRepository,
    CreateUserService,
    DeleteUserService,
    EditUserService,
    SearchUserService,
    GetProfileDataService,
  ],
  exports: [UserRepository],
})
export class UserModule {}
