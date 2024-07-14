import { Controller, Get } from '@nestjs/common'
import { GetAllPostsService } from '@post/services'
import { Post } from '@prisma/client'

@Controller('/post/get-all')
export class GetAllPostsController {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  @Get()
  async handle(): Promise<Post[]> {
    return await this.getAllPostsService.execute()
  }
}
