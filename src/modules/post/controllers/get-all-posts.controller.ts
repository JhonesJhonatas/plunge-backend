import { Controller, Get, Req } from '@nestjs/common'
import { GetAllPostsService } from '@post/services'

import { IPostFormatDto } from '../dto'
import { Request } from 'express'

@Controller('/post/get-all')
export class GetAllPostsController {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  @Get()
  async handle(@Req() request: Request): Promise<IPostFormatDto[]> {
    const { id } = request.user

    return await this.getAllPostsService.execute({ userId: id })
  }
}
