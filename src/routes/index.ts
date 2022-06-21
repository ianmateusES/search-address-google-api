import { Router } from 'express';

import { addressesRoutes } from './addresses.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/addresses', addressesRoutes);

export { routes };
