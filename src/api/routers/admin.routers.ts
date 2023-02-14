import { Router } from 'express';
import controller from '../controllers/admin.controller';
import isAuth from '../middlewares/isAuth';
const router = Router();

router.post('/create-manager', controller.createManager);
router.post('/add-admin', isAuth(), controller.addAdmin);
router.post('/remove-admin', isAuth(), controller.removeAdmin);
router.post('/change-permission', isAuth(), controller.changePermission);

export default router;
