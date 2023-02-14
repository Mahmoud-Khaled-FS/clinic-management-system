import { RequestHandler, Router } from 'express';
import appointmentRouter from './appointment.router';
import authRouter from './auth.router';
import adminRouter from './admin.routers';
import clinicRouter from './clinic.router';
import doctorRouter from './doctor.router';
import employeeRouter from './employee.router';
import invoiceRouter from './invoice.router';
import medicineRouter from './medicine.router';
import patientRouter from './patient.router';
import prescriptionRouter from './prescription.router';
import reportsRouter from './reports.router';
import isAuth from '../middlewares/isAuth';

export class ApiRouters {
  private apiEndpoint = '/api';
  private _router: Router;

  constructor() {
    this._router = Router();
    this.createRouter('auth', authRouter);
    this.createRouter('admin', adminRouter);
    this.createRouter('appointment', appointmentRouter, isAuth());
    this.createRouter('clinic', clinicRouter, isAuth());
    this.createRouter('doctor', doctorRouter, isAuth());
    this.createRouter('employee', employeeRouter);
    this.createRouter('invoice', invoiceRouter, isAuth());
    this.createRouter('medicine', medicineRouter, isAuth());
    this.createRouter('patient', patientRouter, isAuth());
    this.createRouter('prescription', prescriptionRouter, isAuth());
    this.createRouter('report', reportsRouter, isAuth());
  }

  get router() {
    return this._router;
  }

  private createRouter(name: string, router: Router, ...midllwares: RequestHandler[]) {
    this._router.use(this.apiEndpoint + '/' + name, ...midllwares, router);
  }
}

export default new ApiRouters();
