import { Router } from 'express'

import { CreatePostController } from '@post/controllers/create'
import { DeletePostController } from '@post/controllers/delete'
import { EditPostController } from '@post/controllers/edit'
import { GetPostsController } from '@post/controllers/get'

export const postRoutes = Router()

const createPostController = new CreatePostController()
const deletePostController = new DeletePostController()
const editPostController = new EditPostController()
const getPostsController = new GetPostsController()

postRoutes.post('/create', createPostController.handle)

postRoutes.delete('/delete/:id', deletePostController.handle)

postRoutes.put('/edit', editPostController.handle)

postRoutes.get('/get', getPostsController.handle)
