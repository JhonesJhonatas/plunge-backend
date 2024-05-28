import { Router } from 'express'

import { CreateUserController } from '@user/controllers/create-user'
import { createUserParse } from '@user/middlewares/create-user-parse'

import { EditUserController } from '@user/controllers/edit-user'
import { editUserParse } from '../middlewares/edit-user-parse'

export const userRoutes = Router()

const createUserController = new CreateUserController()

const editUserController = new EditUserController()

userRoutes.post('/create', createUserParse.execute, createUserController.handle)

userRoutes.put('/edit', editUserParse.execute, editUserController.handle)
