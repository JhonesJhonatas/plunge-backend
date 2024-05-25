import { container } from 'tsyringe'

import { IUserRepository } from '@user/repository/i-user-repository'
import { UserRepository } from '@user/repository/implementations/user-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
