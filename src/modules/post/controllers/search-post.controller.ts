import { Controller, Get, Query } from '@nestjs/common'

import { SearchPostService } from '@post/services'
import { SearchPostValidation } from '@post/validations'
import { ISearchPostResponseDto } from '@post/dto'

@Controller('/post')
export class SearchPostController {
  constructor(private readonly searchPostService: SearchPostService) {}

  @Get()
  async handle(
    @Query() { content }: SearchPostValidation,
  ): Promise<ISearchPostResponseDto[]> {
    return await this.searchPostService.execute({ content })
  }
}
