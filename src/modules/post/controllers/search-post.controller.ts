import { Controller, Get, Query } from '@nestjs/common'
import { Post } from '@prisma/client'

import { SearchPostService } from '@post/services'
import { SearchPostValidation } from '@post/validations'

@Controller('/post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @Get()
  async handle(@Query() { content }: SearchPostValidation): Promise<Post[]> {
    return await this.searchPostService.execute({ content })
  }
}
