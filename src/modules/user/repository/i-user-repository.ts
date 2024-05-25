import { User } from "@prisma/client";

import { ICreateUserDTO } from "../dto/i-create-user-dto";
import { IEditUserDTO } from "../dto/i-edit-user-dto";

export interface IUserRepository {
  create(user:ICreateUserDTO):Promise<User>
  edit(id:string,data:IEditUserDTO):Promise<User>
  delete(id:string):Promise<User>

  findAll():Promise<User[]>
  findById(id:string):Promise<User>
  findByEmail(email:string):Promise<User>
  findByUserName(userName:string):Promise<User>
}