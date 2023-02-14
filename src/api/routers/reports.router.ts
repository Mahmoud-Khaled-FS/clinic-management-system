import { Router } from 'express';
import controllers from '../controllers/report.controller';
const router = Router();

router.get('/appointment', controllers.getAppointmentReport);
router.get('/invoice', controllers.getInvoiceReport);

export default router;
