import { Controller, Get, Query, Req } from '@nestjs/common'

import { SearchPostService } from '@post/services'
import { SearchPostValidation } from '@post/validations'
import { IPostFormatDto } from '@post/dto'
import { Request } from 'express'

@Controller('/post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @Get()
  async handle(
    @Query() { content, userId }: SearchPostValidation,
    @Req() request: Request,
  ): Promise<IPostFormatDto[]> {
    const { id: authorOfSearchId } = request.user

    return await this.searchPostService.execute({
      content,
      userId,
      authorOfSearchId,
    })
  }
}
