import { Router } from 'express';
import controller from '../controllers/admin.controller';
const router = Router();

router.post('/create-manager', controller.createManager);

export default router;
