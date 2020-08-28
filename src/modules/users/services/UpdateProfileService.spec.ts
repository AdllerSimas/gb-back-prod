import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository, fakeHashProvider
    );
  })

  it('should be able to update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    })

   const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@test.com',
    });

    expect(updateUser.name).toBe('John Trê');

  });

  it('should be able to update the profile from non existing user', async () => {

    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'test name',
      email: 'test@gmail.com'
    })).rejects.toBeInstanceOf(AppError);



  });

  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'John Test',
      email: 'johntest@test.com',
      password: '123456',
    });

    expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@test.com',
    })).rejects.toBeInstanceOf(AppError);



  });

  it('should be able to update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    })

   const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@test.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');

  });

  it('should not be able to update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johntre@test.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
