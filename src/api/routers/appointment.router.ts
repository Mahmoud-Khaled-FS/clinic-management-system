import { Router } from 'express';
import controllers from '../controllers/appointment.controller';
const router = Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.get);
router.post('/new', controllers.create);
router.delete('/:id', controllers.delete);

export default router;
