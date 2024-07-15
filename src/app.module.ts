import { Module } from '@nestjs/common'

import { AuthModule } from '@auth/auth.module'
import { PostModule } from '@post/post.module'
import { UserModule } from '@user/user.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '@auth/guard/auth.guard'

@Module({
  imports: [AuthModule, UserModule, PostModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
