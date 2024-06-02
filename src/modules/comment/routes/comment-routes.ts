import { Router } from 'express'

import { CreateCommentController } from '@comment/controllers/create-comment-controller'
import { EditCommentController } from '@comment/controllers/edit-comment-controller'
import { DeleteCommentController } from '@comment/controllers/delete-comment-controller'
import { GetCommentsController } from '@comment/controllers/get-comment-controller'

export const commentRoutes = Router()

const createCommentController = new CreateCommentController()
const editCommentController = new EditCommentController()
const deleteCommentController = new DeleteCommentController()
const getCommentsController = new GetCommentsController()

commentRoutes.post('/create', createCommentController.handle)

commentRoutes.delete('/delete/:id', deleteCommentController.handle)

commentRoutes.put('/edit', editCommentController.handle)

commentRoutes.get('/get', getCommentsController.handle)
