import { Module } from '@nestjs/common'

import { CreateUserController, EditUserController } from '@user/controllers'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { CreateUserService, EditUserService } from '@user/services'

@Module({
  controllers: [CreateUserController, EditUserController],
  providers: [UserRepository, CreateUserService, EditUserService],
})
export class UserModule {}
