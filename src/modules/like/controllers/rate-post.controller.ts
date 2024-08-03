import { Request } from 'express'

import { Body, Controller, Post, Req } from '@nestjs/common'

import { RatePostValidation } from '@like/validations'
import { RatePostService } from '@like/services/rate-post.service'

@Controller('/like/rate-post')
export class RatePostController {
  constructor(private readonly ratePostService: RatePostService) {}

  @Post()
  async handle(
    @Body() { postId, like }: RatePostValidation,
    @Req() request: Request,
  ) {
    const { id: userId } = request.user

    return await this.ratePostService.execute({ like, postId, userId })
  }
}
