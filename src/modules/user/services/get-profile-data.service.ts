import { Injectable } from '@nestjs/common'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { GetProfileDataValidation } from '@user/validations'
import { IPostFormatDto } from '@/modules/post/dto'

@Injectable()
export class GetProfileDataService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: GetProfileDataValidation) {
    const user = await this.userRepository.getProfileData(params.nickName)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const acceptedFollowing = user.following.filter((follower) => {
      return follower.status === 'ACCEPTED'
    })

    const pendingFollowing = user.following.filter((follower) => {
      return follower.status === 'PENDING'
    })

    const acceptedFollowers = user.followers.filter((following) => {
      return following.status === 'ACCEPTED'
    })

    const pendingFollowers = user.followers.filter((following) => {
      return following.status === 'PENDING'
    })

    const formattedPosts: IPostFormatDto[] = user.posts.map(
      ({ Like: likes, id, content, mediaUrl, createdAt, updatedAt }) => {
        return {
          id,
          content,
          mediaUrl,
          createdAt,
          updatedAt,
          author: {
            id: user.id,
            name: user.name,
            avatarUrl: user.avatarUrl,
            nickName: user.nickName,
          },
          likesCount: likes.length,
          userCanLike: false,
          userAleradyLiked: false,
          likes: likes.map((like) => {
            return {
              id: like.id,
              createdAt: like.createdAt,
              user: {
                id: like.user.id,
                name: like.user.name,
                nickName: like.user.nickName,
                avatarUrl: like.user.avatarUrl,
              },
            }
          }),
        }
      },
    )

    const formattedUserData = {
      user: {
        id: user.id,
        name: user.name,
        nickName: user.nickName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      posts: formattedPosts,
      follows: {
        acceptedFollowers,
        acceptedFollowing,
        pendingFollowers,
        pendingFollowing,
        counts: {
          followers: acceptedFollowers.length,
          following: acceptedFollowing.length,
        },
      },
    }

    return formattedUserData
  }
}
