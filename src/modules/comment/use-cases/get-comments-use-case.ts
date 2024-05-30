import { inject, injectable } from 'tsyringe'

import { ICommentRepository } from '@comment/repository/i-comment-repository'

@injectable()
export class GetCommentsUseCase {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  async execute() {
    return await this.commentRepository.get()
  }
}
