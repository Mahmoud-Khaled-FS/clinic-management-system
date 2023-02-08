import { Router } from 'express';
import appointmentRouter from './appointment.router';
import clinicRouter from './clinic.router';
import doctorRouter from './doctor.router';
import employeeRouter from './employee.router';
import invoiceRouter from './invoice.router';
import medicineRouter from './medicine.router';
import patientRouter from './patient.router';
import prescriptionRouter from './prescription.router';
import reportsRouter from './reports.router';

export class ApiRouters {
  private _router: Router;
  constructor() {
    this._router = Router();
    this.createRouter(appointmentRouter);
    this.createRouter(clinicRouter);
    this.createRouter(doctorRouter);
    this.createRouter(employeeRouter);
    this.createRouter(invoiceRouter);
    this.createRouter(medicineRouter);
    this.createRouter(patientRouter);
    this.createRouter(prescriptionRouter);
    this.createRouter(reportsRouter);
  }
  get router() {
    return this._router;
  }
  private createRouter(router: Router) {
    const routerName = router.name.replace('Router', '');
    this._router.use('/' + routerName, router);
  }
}

export default new ApiRouters();
