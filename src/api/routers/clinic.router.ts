import { Router } from 'express';
import controller from '../controllers/clinic.controller';
const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/new', controller.create);
router.patch('/edit/:id', controller.edit);
router.delete('/delete/:id', controller.delete);

export default router;
