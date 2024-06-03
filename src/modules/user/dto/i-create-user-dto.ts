export interface ICreateUserDTO {
  name: string
  userName: string
  email: string
  password: string
  birthDate: Date
  avatarUrl?: string
  coverUrl?: string
  topics?: string[]
}
