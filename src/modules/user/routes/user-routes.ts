import { Router } from 'express'

import { CreateUserController } from '@user/controllers/create-user'

export const userRoutes = Router()

const createUserController = new CreateUserController()

userRoutes.post('/create', createUserController.handle)
