import { Router } from 'express';
import controller from '../controllers/employee.controller';
import isAuth from '../middlewares/isAuth';
const router = Router();

router.get('/', isAuth(), controller.getAll);

router.get('/:id', isAuth(), controller.getById);

router.post('/create', isAuth(), controller.create);

router.patch('/edit', isAuth(true), controller.edit);

router.patch('/edit/:id', isAuth(), controller.editById);

router.delete('/delete/:id', isAuth(), controller.deleteById);

export default router;
