import { Router } from 'express'

import { CreateUserController } from '@user/controllers/create-user'
import { createUserParse } from '@user/middlewares/create-user-parse'

import { EditUserController } from '@user/controllers/edit-user'
import { editUserParse } from '@user/middlewares/edit-user-parse'

import { FindAllUsersController } from '@user/controllers/find-all'

import { DeleteUserController } from '@user/controllers/delete'

export const userRoutes = Router()

const createUserController = new CreateUserController()
const editUserController = new EditUserController()
const findAllUsersController = new FindAllUsersController()
const deleteUserController = new DeleteUserController()

userRoutes.post('/create', createUserParse.execute, createUserController.handle)

userRoutes.put('/edit', editUserParse.execute, editUserController.handle)

userRoutes.get('/find-all', findAllUsersController.handle)

userRoutes.delete(
  '/delete/:id',
  editUserParse.execute,
  deleteUserController.handle,
)
