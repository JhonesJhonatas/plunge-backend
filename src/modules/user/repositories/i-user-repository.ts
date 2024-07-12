import { User } from '@prisma/client'

import { IEditUserDto, ICreateUserDto, ISearchUserDto } from '@user/dto'

export interface IUserRepository {
  create: (params: ICreateUserDto) => Promise<User>
  edit: (params: IEditUserDto) => Promise<User>

  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>

  search: (params: ISearchUserDto) => Promise<User[]>
}
