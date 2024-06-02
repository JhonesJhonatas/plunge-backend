import { Router } from 'express'

import { userRoutes } from '@user/routes/user-routes'
import { topicRoutes } from '@/modules/topic/routes/topic-routes'
import { postRoutes } from '@/modules/post/routes/post-routes'
import { commentRoutes } from '@/modules/comment/routes/comment-routes'

export const routes = Router()

routes.use('/user', userRoutes)

routes.use('/topic', topicRoutes)

routes.use('/post', postRoutes)

routes.use('/comment', commentRoutes)
