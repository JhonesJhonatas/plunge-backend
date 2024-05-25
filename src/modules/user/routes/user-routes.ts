import { Router } from 'express'

import { CreateUserController } from '@user/controllers/create-user'
import { CreateUserParse } from '@user/middlewares/create-user-parse'

export const userRoutes = Router()

const createUserParse = new CreateUserParse()
const createUserController = new CreateUserController()

userRoutes.post('/create', createUserParse.execute, createUserController.handle)
