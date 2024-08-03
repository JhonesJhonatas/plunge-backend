import { Follower } from '@prisma/client'

import {
  ICreateFollowerDto,
  IDeleteFollowerDto,
  IEditFollowerDto,
} from '@follower/dto'

export interface IFollowerRepository {
  create(params: ICreateFollowerDto): Promise<Follower>

  edit(params: IEditFollowerDto): Promise<Follower>

  delete(params: IDeleteFollowerDto): Promise<Follower>
}
