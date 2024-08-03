import { Module } from '@nestjs/common'

import { LikeRepository } from '@like/repositories/implementations/like-repository'

import { RatePostController } from '@like/controllers'

import { RatePostService } from '@like/services'

import { UserModule } from '@user/user.module'
import { PostModule } from '@post/post.module'

@Module({
  imports: [UserModule, PostModule],
  controllers: [RatePostController],
  providers: [LikeRepository, RatePostService],
  exports: [LikeRepository],
})
export class LikeModule {}
