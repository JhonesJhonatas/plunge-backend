import { Get } from '@nestjs/common'
import { GetAllPostsService } from '@post/services'
import { Post } from '@prisma/client'

export class GetAllPostsController {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  @Get()
  async handle(): Promise<Post[]> {
    return await this.getAllPostsService.execute()
  }
}
