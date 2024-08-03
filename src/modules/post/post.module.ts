import { Module } from '@nestjs/common'

import { PostRepository } from './repositories/implementations/post-repository'

import {
  CreatePostController,
  DeletePostController,
  EditPostController,
  GetAllPostsController,
  SearchPostController,
} from './controllers'

import {
  CreatePostService,
  DeletePostService,
  EditPostService,
  GetAllPostsService,
  SearchPostService,
} from './services'

import { UserModule } from '@user/user.module'

@Module({
  imports: [UserModule],
  controllers: [
    CreatePostController,
    DeletePostController,
    EditPostController,
    GetAllPostsController,
    SearchPostController,
  ],
  providers: [
    PostRepository,
    CreatePostService,
    DeletePostService,
    EditPostService,
    GetAllPostsService,
    SearchPostService,
  ],
  exports: [PostRepository],
})
export class PostModule {}
