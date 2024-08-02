import { Injectable } from '@nestjs/common'

import { AppError } from '@common/errors'

import { UserRepository } from '@user/repositories/implementations/user-repository'

import { GetProfileDataValidation } from '@user/validations'

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
      posts: user.posts,
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
