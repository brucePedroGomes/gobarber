import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import uploadConfig from '@config/upload';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(uploadConfig);

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', async (request, response) => {
  const usersRepositoryTest = getRepository(User);
  const users = await usersRepositoryTest.find();

  return response.json(users);
});

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
