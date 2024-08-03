import { Post, User } from '@prisma/client'

export interface IGetAllPostsResposeDto extends Post {
  User: User
}
