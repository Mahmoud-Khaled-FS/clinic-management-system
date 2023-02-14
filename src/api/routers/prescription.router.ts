import { Router } from 'express';
import controllers from '../controllers/prescription.controller';
const router = Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.get);
router.post('/new', controllers.create);
router.delete('/delete/:id', controllers.delete);

export default router;
