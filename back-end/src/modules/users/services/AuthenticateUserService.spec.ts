import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUser from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUser;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUser(
      fakeUsersRepository,
      fakeHashProvider,
    );

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234567',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@email.com',
      password: '1234567',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shoud not be able to authenticate with no existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234567',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
