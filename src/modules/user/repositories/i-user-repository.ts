import { User } from '@prisma/client'

import {
  IEditUserDto,
  ICreateUserDto,
  IDeleteUserDto,
  IGetProfileDataResponseDto,
} from '@user/dto'

export interface IUserRepository {
  create: (params: ICreateUserDto) => Promise<User>
  edit: (params: IEditUserDto) => Promise<User>

  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByNickName: (nickName: string) => Promise<User | null>
  findAll: () => Promise<User[]>

  getProfileData: (nickName: string) => Promise<IGetProfileDataResponseDto>

  searchByName: (name: string) => Promise<User[]>
  searchByEmail: (email: string) => Promise<User[]>
  searchByNickName: (nickName: string) => Promise<User[]>

  delete: (params: IDeleteUserDto) => Promise<User>
}
