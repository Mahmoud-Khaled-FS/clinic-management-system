import { Router } from 'express';
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

export class ApiRouters {
  private apiEndpoint = '/api';
  private _router: Router;

  constructor() {
    this._router = Router();
    this.createRouter('auth', authRouter);
    this.createRouter('admin', adminRouter);
    this.createRouter('appointment', appointmentRouter);
    this.createRouter('clinic', clinicRouter);
    this.createRouter('doctor', doctorRouter);
    this.createRouter('employee', employeeRouter);
    this.createRouter('invoice', invoiceRouter);
    this.createRouter('medicine', medicineRouter);
    this.createRouter('patient', patientRouter);
    this.createRouter('prescription', prescriptionRouter);
    this.createRouter('reports', reportsRouter);
  }

  get router() {
    return this._router;
  }

  private createRouter(name: string, router: Router) {
    this._router.use(this.apiEndpoint + '/' + name, router);
  }
}

export default new ApiRouters();
