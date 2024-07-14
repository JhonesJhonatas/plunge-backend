import { Module } from '@nestjs/common'

import { UserRepository } from '@user/repositories/implementations/user-repository'

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
