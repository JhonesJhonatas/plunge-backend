import { AppError } from '@common/errors'
import { InMemoryUserRepository } from '@user/repositories/implementations/in-memory-user-repository'
import { CreateUserService, EditUserService } from '@user/services'

let editUserService: EditUserService
let createUserService: CreateUserService

describe('edit-user-service', () => {
  beforeEach(async () => {
    const userRepository = new InMemoryUserRepository()
    editUserService = new EditUserService(userRepository)
    createUserService = new CreateUserService(userRepository)

    await createUserService.execute({
      name: 'tester',
      email: 'tester@email.com',
      password: '123456',
      nickName: 'editTester',
      bio: 'Just a tester',
      avatarUrl: null,
    })

    await createUserService.execute({
      name: 'tester2',
      email: 'tester2@email.com',
      password: '123456',
      nickName: 'editTester2',
      bio: 'Just a tester',
      avatarUrl: null,
    })
  })

  it('should not be able to edit a user that does not exist', async () => {
    const userToUpdate = {
      id: 'inexist-id',
      name: 'tester',
      email: 'tester@email.com',
      nickName: 'editTester',
      bio: 'Just a tester',
      password: '123456',
      avatarUrl: null,
    }

    await expect(editUserService.execute(userToUpdate)).rejects.toEqual(
      new AppError('User not found', 404),
    )
  })

  it('should not be able to edit a user without providing any field', async () => {
    const userToUpdate = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      name: null,
      email: null,
      nickName: null,
      bio: null,
      password: null,
      avatarUrl: null,
    }

    await expect(editUserService.execute(userToUpdate)).rejects.toEqual(
      new AppError('You must provide at least one field to update', 400),
    )
  })

  it('should not be able to edit a user with an email that is already registered', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      name: null,
      email: 'tester@email.com',
      password: '123456',
      avatarUrl: null,
      nickName: null,
      bio: null,
    }

    await expect(editUserService.execute(userToEdit)).rejects.toEqual(
      new AppError('Email already registered', 400),
    )
  })

  it('should not be able to edit a user with an nickName that is already registered', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      name: null,
      email: null,
      password: '123456',
      avatarUrl: null,
      nickName: 'editTester2',
      bio: null,
    }

    await expect(editUserService.execute(userToEdit)).rejects.toEqual(
      new AppError('NickName already registered', 400),
    )
  })

  it('should be able to edit a user with a new email', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'new.email@email.com',
      name: null,
      nickName: null,
      bio: null,
      password: null,
      avatarUrl: null,
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
    expect(editedUser.email).toBe(userToEdit.email)
  })

  it('should be able to edit a user with a new name', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: null,
      name: 'New Name',
      nickName: null,
      bio: null,
      password: null,
      avatarUrl: null,
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
    expect(editedUser.name).toBe(userToEdit.name)
  })

  it('should be able to edit a user with a new password', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: null,
      name: null,
      nickName: null,
      bio: null,
      password: '123456',
      avatarUrl: null,
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
  })

  it('should be able to edit a user with a new avatarUrl', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: null,
      name: null,
      password: null,
      nickName: null,
      bio: null,
      avatarUrl: 'just-avatar',
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
  })

  it('should be able to edit a user with a new biography', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: null,
      name: null,
      password: null,
      nickName: null,
      bio: 'Biography',
      avatarUrl: null,
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
  })

  it('should be able to edit a user with a new nickName', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: null,
      name: null,
      password: null,
      nickName: 'editedNickName',
      bio: null,
      avatarUrl: null,
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
  })

  it('should be able to edit a user with a full data', async () => {
    const userToEdit = {
      id: '42a50108-3d20-4f4e-9565-20b4945c21da',
      email: 'new.email@email.com',
      name: 'New Name',
      password: 'new Password',
      avatarUrl: 'newAvatar',
      nickName: 'newNickName',
      bio: 'new biography',
    }

    const editedUser = await editUserService.execute(userToEdit)

    expect(editedUser).toHaveProperty('id')
    expect(editedUser.name).toBe(userToEdit.name)
    expect(editedUser.email).toBe(userToEdit.email)
  })
})
