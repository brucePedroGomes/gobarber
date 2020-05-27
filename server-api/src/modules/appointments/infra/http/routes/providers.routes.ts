import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersController = new ProvidersController();
const providerMonthController = new ProviderMonthAvailabilityController();
const providerDayController = new ProviderDayAvailabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayController.index,
);

export default providersRouter;
