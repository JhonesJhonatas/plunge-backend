import { Router } from 'express'

import { CreateUserController } from '@user/controllers/create-user-controller'
import { createUserParse } from '@user/middlewares/create-user-parse'

import { EditUserController } from '@user/controllers/edit-user-controller'
import { editUserParse } from '@user/middlewares/edit-user-parse'

import { FindAllUsersController } from '@user/controllers/find-all-users-controller'

import { DeleteUserController } from '@user/controllers/delete-user-controller'
import { AuthenticateUserController } from '@user/controllers/authenticate-user-controller'

export const userRoutes = Router()

const createUserController = new CreateUserController()
const editUserController = new EditUserController()
const findAllUsersController = new FindAllUsersController()
const deleteUserController = new DeleteUserController()

const authenticateUserController = new AuthenticateUserController()

userRoutes.post('/create', createUserParse.execute, createUserController.handle)

userRoutes.put('/edit', editUserParse.execute, editUserController.handle)

userRoutes.get('/find-all', findAllUsersController.handle)

userRoutes.delete('/delete/:id', deleteUserController.handle)

userRoutes.post('/authenticate', authenticateUserController.handle)
