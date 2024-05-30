import { inject, injectable } from 'tsyringe'

import { AppError } from '@/errors/app-error'

import { ICommentRepository } from '@comment/repository/i-comment-repository'
import { IEditCommentDTO } from '../dto/i-edit-comment-dto'

@injectable()
export class EditCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  async execute({ id, content }: IEditCommentDTO) {
    const comment = await this.commentRepository.getById(id)

    if (!comment) throw new AppError('Comment not found', 404)

    return await this.commentRepository.edit({ id, content })
  }
}
