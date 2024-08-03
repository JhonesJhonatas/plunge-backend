import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@auth/guard/auth.guard'

import { FollowerModule } from '@follower/follower.module'

import { AuthModule } from '@auth/auth.module'
import { UserModule } from '@user/user.module'
import { PostModule } from '@post/post.module'
import { LikeModule } from '@like/like.module'

@Module({
  imports: [AuthModule, FollowerModule, UserModule, PostModule, LikeModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
