import { AddressController } from 'app/controllers';
import { Router } from 'express';

// http://${url}:${port}/addresses
const addressesRoutes = Router();
const addressController = new AddressController();

addressesRoutes.get('/', addressController.index);

addressesRoutes.get('/details/:place_id', addressController.show);

export { addressesRoutes };
