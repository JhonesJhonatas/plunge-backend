import { Module } from '@nestjs/common'

import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@auth/guard/auth.guard'

import { AuthModule } from '@auth/auth.module'
import { FollowersModule } from '@followers/followers.module'
import { UserModule } from '@user/user.module'
import { PostModule } from '@post/post.module'

@Module({
  imports: [AuthModule, FollowersModule, UserModule, PostModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
