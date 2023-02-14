import { Router } from 'express';
import controllers from '../controllers/medicine.controller';
const router = Router();

router.get('/', controllers.getAll);
router.get('/:id', controllers.get);
router.post('/new', controllers.create);
router.delete('/delete/:id', controllers.delete);
router.patch('/edit/:id', controllers.edit);

export default router;
