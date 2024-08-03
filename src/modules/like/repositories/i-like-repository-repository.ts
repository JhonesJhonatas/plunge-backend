import { Like } from '@prisma/client'

import { ILikePostDto, IUnlikePostDto } from '@like/dto'

export interface ILikeRepository {
  likePost(params: ILikePostDto): Promise<Like>
  unlikePost(params: IUnlikePostDto): Promise<Like>
}
