// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@Doe.com',
      password: '1234567',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Test Doe',
      email: 'johnTest@Doe.com',
      password: '1234567',
    });

    const loggeUser = await fakeUsersRepository.create({
      name: 'Jhon Test',
      email: 'testDoe@Doe.com',
      password: '1234567',
    });

    const providers = await listProviders.execute({
      user_id: loggeUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
