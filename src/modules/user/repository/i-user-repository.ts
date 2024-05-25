import { User } from '@prisma/client'

import { ICreateUserDTO } from '@user/dto/i-create-user-dto'
import { IEditUserDTO } from '@user/dto/i-edit-user-dto'

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>
  edit(user: IEditUserDTO): Promise<User>
  delete(id: string): Promise<User>

  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByUserName(userName: string): Promise<User | null>
}
