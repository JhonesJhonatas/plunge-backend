import { inject, injectable } from 'tsyringe'

import { ICommentRepository } from '@comment/repository/i-comment-repository'

@injectable()
export class DeleteCommentUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  async execute(id: string) {
    return await this.commentRepository.delete(id)
  }
}
