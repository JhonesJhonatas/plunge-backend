import { Controller, Get, Query } from '@nestjs/common'

import { SearchPostService } from '@post/services'
import { SearchPostValidation } from '@post/validations'
import { IPostFormatDto } from '@post/dto'

@Controller('/post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @Get()
  async handle(
    @Query() { content, userId }: SearchPostValidation,
  ): Promise<IPostFormatDto[]> {
    return await this.searchPostService.execute({ content, userId })
  }
}
