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
  SearchUserService,
} from '@user/services'
import { UserRepository } from './repositories/implementations/user-repository'

@Module({
  controllers: [
    CreateUserController,
    DeleteUserController,
    EditUserController,
    SearchUserController,
  ],
  providers: [
    UserRepository,
    CreateUserService,
    DeleteUserService,
    EditUserService,
    SearchUserService,
  ],
})
export class UserModule {}
