import { Router } from 'express'

import { userRoutes } from '@user/routes/user-routes'
import { topicRoutes } from '@/modules/topic/routes/topic-routes'

export const routes = Router()

routes.use('/user', userRoutes)
routes.use('/topic', topicRoutes)
