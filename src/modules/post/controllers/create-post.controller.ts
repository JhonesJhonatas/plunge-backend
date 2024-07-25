import { Post as PostType } from '@prisma/client'

import { Body, Controller, Post, Req } from '@nestjs/common'

import { CreatePostService } from '@post/services'
import { CreatePostValidation } from '@post/validations'
import { Request } from 'express'

@Controller('/post')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  async handle(
    @Body() params: CreatePostValidation,
    @Req() request: Request,
  ): Promise<PostType> {
    const {
      user: { id },
    } = request

    return await this.createPostService.execute({ userId: id, ...params })
  }
}
