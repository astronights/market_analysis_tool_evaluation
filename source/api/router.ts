import { Router } from 'express';

import { TestController } from './controllers/testController';

const router = Router();

const testApis = new TestController();

router.use('/', testApis.router);

export default router;