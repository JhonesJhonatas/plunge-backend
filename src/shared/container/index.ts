import { container } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'
import { UserRepository } from '@user/repository/implementations/user-repository'

import { ITopicRepository } from '@topic/repository/i-topic-repository'
import { TopicRepository } from '@topic/repository/implementations/topic-repository'

import { IPostRepository } from '@post/repository/i-post-repository'
import { PostRepository } from '@post/repository/implementations/post-repository'

import { ICommentRepository } from '@comment/repository/i-comment-repository'
import { CommentRepository } from '@comment/repository/implementations/comment-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<ITopicRepository>(
  'TopicRepository',
  TopicRepository,
)

container.registerSingleton<IPostRepository>('PostRepository', PostRepository)

container.registerSingleton<ICommentRepository>(
  'CommentRepository',
  CommentRepository,
)
