export interface IEditFollowersDto {
  followedById: string
  followingId: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
}
