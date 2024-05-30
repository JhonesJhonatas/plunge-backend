import { inject, injectable } from 'tsyringe'
import { AppError } from '@/errors/app-error'

import { IPostRepository } from '@post/repository/i-post-repository'

import { ICommentRepository } from '@comment/repository/i-comment-repository'
import { IUserRepository } from '@user/repository/i-user-repository'
import { ICreateCommentDTO } from '@comment/dto/i-create-comment-dto'

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  async execute({ content, postId, userId }: ICreateCommentDTO) {
    const [user, post] = await Promise.all([
      this.userRepository.findById(userId),
      this.postRepository.getById(postId),
    ])

    if (!user) throw new AppError('User not found', 404)

    if (!post) throw new AppError('Post not found', 404)

    return await this.commentRepository.create({
      content,
      postId,
      userId,
    })
  }
}
