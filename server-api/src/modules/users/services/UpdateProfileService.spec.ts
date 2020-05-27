import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@Doe.com',
      password: '1234567',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe two',
      email: 'johnDoeTwo@email.com',
    });

    expect(updateUser.name).toBe('John Doe two');
    expect(updateUser.email).toBe('johnDoeTwo@email.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@Doe.com',
      password: '1234567',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@Doe.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'John@Doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@Doe.com',
      password: '1234567',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe two',
      email: 'johnDoeTwo@email.com',
      old_password: '1234567',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@Doe.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe two',
        email: 'johnDoeTwo@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@Doe.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe two',
        email: 'johnDoeTwo@email.com',
        old_password: 'wrong-old-password',
        password: '77777777',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'does not exist',
        name: 'John Doe two',
        email: 'johnDoeTwo@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
