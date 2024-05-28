import { Router } from 'express'
import { CreateManyTopicsController } from '@topic/controllers/create-many'
import { FindAllTopicsController } from '@topic/controllers/find-all'
import { DeleteTopicController } from '@topic/controllers/delete'

export const topicRoutes = Router()

const createManyTopicsController = new CreateManyTopicsController()
const deleteTopicController = new DeleteTopicController()
const findAllUsersController = new FindAllTopicsController()

topicRoutes.post('/create-many', createManyTopicsController.handle)

topicRoutes.delete('/delete/:id', deleteTopicController.handle)

topicRoutes.get('/find-all', findAllUsersController.handle)
