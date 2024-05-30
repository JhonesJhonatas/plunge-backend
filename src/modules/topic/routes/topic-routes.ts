import { Router } from 'express'
import { CreateManyTopicsController } from '@topic/controllers/create-many-topics-controller'
import { FindAllTopicsController } from '@topic/controllers/find-all-topics-controller'
import { DeleteTopicController } from '@topic/controllers/delete-topic-controller'

export const topicRoutes = Router()

const createManyTopicsController = new CreateManyTopicsController()
const deleteTopicController = new DeleteTopicController()
const findAllUsersController = new FindAllTopicsController()

topicRoutes.post('/create-many', createManyTopicsController.handle)

topicRoutes.delete('/delete/:id', deleteTopicController.handle)

topicRoutes.get('/find-all', findAllUsersController.handle)
