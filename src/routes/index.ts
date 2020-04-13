import { Router } from 'express';

const routes = Router();

routes.get('/', (resquest, response) =>
  response.json({ message: 'Hesllo GoStacksssssssssssssssssssssssssss' }),
);

export default routes;
