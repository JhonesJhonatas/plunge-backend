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

@Module({
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
})
export class PostModule {}
