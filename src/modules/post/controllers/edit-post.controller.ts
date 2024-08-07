import { Body, Controller, Put } from '@nestjs/common'

import { Post } from '@prisma/client'

import { EditPostService } from '@post/services'
import { EditPostValidation } from '@post/validations'

@Controller('/post')
export class EditPostController {
  constructor(private readonly editPostService: EditPostService) {}

  @Put()
  async handle(@Body() params: EditPostValidation): Promise<Post> {
    return await this.editPostService.execute(params)
  }
}
