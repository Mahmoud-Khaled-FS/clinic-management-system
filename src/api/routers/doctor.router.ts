import { Router } from 'express';
import controllers from '../controllers/doctor.controller';
const router = Router();

router.get('/', controllers.getDoctors);
router.get('/:id', controllers.getById);
router.post('/new', controllers.createDoctor);
router.post('/:id/profile', controllers.createProfile);
router.patch('/:id/edit', controllers.editProfile);

export default router;
