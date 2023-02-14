import { Router } from 'express';
import controllers from '../controllers/invoice.controller';
const router = Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.get);
router.post('/new', controllers.create);

export default router;
