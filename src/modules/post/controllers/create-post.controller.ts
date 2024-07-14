import { Post as PostType } from '@prisma/client'

import { Body, Controller, Post } from '@nestjs/common'

import { CreatePostService } from '@post/services'
import { CreatePostValidation } from '@post/validations'

@Controller('/post')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  async handle(@Body() params: CreatePostValidation): Promise<PostType> {
    return await this.createPostService.execute(params)
  }
}
