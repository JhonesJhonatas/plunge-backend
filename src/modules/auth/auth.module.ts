import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '@user/user.module'

import { SignInController } from '@auth/controllers'
import { SignInService } from './services'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '360000000s' },
    }),
  ],
  controllers: [SignInController],
  providers: [SignInService],
})
export class AuthModule {}
