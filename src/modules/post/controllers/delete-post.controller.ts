import { Controller, Delete, Param } from '@nestjs/common'
import { Post } from '@prisma/client'

import { DeletePostService } from '@post/services'
import { DeletePostValidation } from '@post/validations'

@Controller('/post/:id')
export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  @Delete()
  async handle(@Param() params: DeletePostValidation): Promise<Post> {
    return await this.deletePostService.execute(params)
  }
}
