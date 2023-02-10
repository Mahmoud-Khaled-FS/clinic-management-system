import { Router } from 'express';
import controllers from '../controllers/auth.controller';
const router = Router();

router.post('/login', controllers.login);

export default router;
