import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const usersController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', usersController.show);
profileRouter.put('/', usersController.update);

export default profileRouter;
