import { Controller, Delete, Param } from '@nestjs/common'
import { Post } from '@prisma/client'

import { DeletePostService } from '@post/services'
import { DeletePostValidation } from '@post/validations'

@Controller('/post')
export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  @Delete(':id')
  async handle(@Param() params: DeletePostValidation): Promise<Post> {
    return await this.deletePostService.execute(params)
  }
}
