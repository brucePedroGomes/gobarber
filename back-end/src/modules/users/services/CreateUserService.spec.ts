import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserRepository from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserRepository(fakeUsersRepository);

    const users = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '1234567',
    });

    expect(users).toHaveProperty('id');
  });
});
