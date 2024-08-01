import { Controller, Get } from '@nestjs/common'
import { GetAllPostsService } from '@post/services'

import { IPostFormatDto } from '../dto'

@Controller('/post/get-all')
export class GetAllPostsController {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  @Get()
  async handle(): Promise<IPostFormatDto[]> {
    return await this.getAllPostsService.execute()
  }
}
