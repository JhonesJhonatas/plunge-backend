import bcrypt from 'bcrypt'

import { AppError } from '@/errors/app-error'

import { InMemoryUserRepository } from '@user/repository/implementations/in-memory-user-repository'
import { EditUserUseCase } from '@user/use-cases/edit-user-use-case'

const userRepository = new InMemoryUserRepository()
const editUserUseCase = new EditUserUseCase(userRepository)

describe('edit-user-use-case', () => {
  it('should be able to edit a user with complete data', async () => {
    const userToEdit = {
      id: 'd51feab3-b0df-468f-928a-b06e11776bed',
      name: 'Joanisvaldo',
      userName: 'jhonesjhonatas',
      email: 'jhones.jhonatas@example.com',
      password: 'senha123',
      birthDate: new Date('1995-12-24T00:00:00.000Z'),
      avatarUrl: 'https://example.com/avatar.jpg',
      coverUrl: 'https://example.com/cover.jpg',
      createdAt: new Date('2024-05-25T06:33:34.631Z'),
      updatedAt: new Date('2024-05-28T00:36:23.388Z'),
    }

    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const editedUser = await editUserUseCase.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
    expect(editedUser.name).toBe(userToEdit.name)
    expect(editedUser.userName).toBe(userToEdit.userName)
    expect(editedUser.email).toBe(userToEdit.email)
    expect(editedUser).toHaveProperty('password')
    expect(editedUser).toHaveProperty('birthDate')
    expect(editedUser.avatarUrl).toBe(userToEdit.avatarUrl)
    expect(editedUser.coverUrl).toBe(userToEdit.coverUrl)

    expect(hashSpy).toHaveBeenCalledWith(userToEdit.password, 8)
    expect(hashSpy).toHaveBeenCalledTimes(1)
  })

  it('should be able to edit a user without password', async () => {
    const userToEdit = {
      id: 'd51feab3-b0df-468f-928a-b06e11776bed',
      name: 'Joanisvaldo',
      userName: 'jhonesjhonatas',
      email: 'jhones.jhonatas@example.com',
    }

    const editedUser = await editUserUseCase.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
    expect(editedUser.name).toBe(userToEdit.name)
    expect(editedUser.userName).toBe(userToEdit.userName)
    expect(editedUser.email).toBe(userToEdit.email)
    expect(editedUser).toHaveProperty('password')
    expect(editedUser).toHaveProperty('birthDate')
  })

  it('should not be able to edit user with unexist id', async () => {
    const userToEdit = {
      id: '123123',
      name: 'Joanisvaldo',
      userName: 'jhonesjhonatas',
    }

    await expect(editUserUseCase.execute(userToEdit)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should not be able to edit a user with an already registered email', async () => {
    const userToEdit = {
      id: 'd51feab3-b0df-468f-928a-b06e11776bes',
      name: 'Joanisvaldo',
      userName: 'tester',
      email: 'jhones.jhonatas@example.com',
    }

    await expect(editUserUseCase.execute(userToEdit)).rejects.toEqual(
      new AppError('Email already registered', 400),
    )
  })

  it('should not be able to edit a user with an already taken username', async () => {
    const userToEdit = {
      id: 'd51feab3-b0df-468f-928a-b06e11776bes',
      name: 'Jhones Jhonatas',
      userName: 'jhonesjhonatas',
      email: 'tester@example.com',
    }

    await expect(editUserUseCase.execute(userToEdit)).rejects.toEqual(
      new AppError('Username already taken', 400),
    )
  })
})
