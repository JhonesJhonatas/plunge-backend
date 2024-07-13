import { User } from '@prisma/client'

import { IEditUserDto, ICreateUserDto, IDeleteUserDto } from '@user/dto'

export interface IUserRepository {
  create: (params: ICreateUserDto) => Promise<User>
  edit: (params: IEditUserDto) => Promise<User>

  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>

  searchByName: (name: string) => Promise<User[]>
  searchByEmail: (email: string) => Promise<User[]>

  delete: (params: IDeleteUserDto) => Promise<User>
}
