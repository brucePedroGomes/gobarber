import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/IBcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
