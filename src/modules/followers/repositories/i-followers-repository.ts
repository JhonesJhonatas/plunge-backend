import { Followers } from '@prisma/client'

import {
  ICreateFollowersDto,
  IDeleteFollowersDto,
  IEditFollowersDto,
} from '@followers/dto'

export interface IFollowsRepository {
  create(params: ICreateFollowersDto): Promise<Followers>

  edit(params: IEditFollowersDto): Promise<Followers>

  delete(params: IDeleteFollowersDto): Promise<Followers>
}
