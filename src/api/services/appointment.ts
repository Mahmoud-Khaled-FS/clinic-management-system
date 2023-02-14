import employeeModel from '../models/employee.model';
import patientModel from '../models/patient.model';
import AppointmentModel from '../models/appointment.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { AppointmentBody } from '../validations/appointment.valid';
import clinicModel from '../models/clinic.model';
import server from '../../config/server';

class AppointmentService {
  static async create(appointmentData: AppointmentBody) {
    const doc = await employeeModel.findById(appointmentData.doctor);
    if (!doc) throw new ServerError('Doctor Not found', 401);
    const patient = await patientModel.findById(appointmentData.patient);
    if (!patient) throw new ServerError('Patient Not found', 401);
    const c = await clinicModel.findById(appointmentData.clinic);
    if (!c) throw new ServerError('Clinic Not found', 401);
    const appointment = new AppointmentModel(appointmentData);

    const a = await appointment.save();
    const docSocket = server.socket.getUser(doc._id.toString());
    if (docSocket) {
      server.socket.io.to(docSocket).emit('new-appointment', a);
    }
    return a;
  }

  static async delete(id: string) {
    await AppointmentModel.findByIdAndRemove(id);
    return;
  }

  static async getById(id: string) {
    const appointment = await AppointmentModel.findById(id).populate(['doctor', 'patient', 'clinic']);
    if (!appointment) {
      throw new ServerError('appointment not found', 404);
    }
    return appointment;
  }

  static async getAll(page: number, options: any) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('createdAt', options.sort);
    if (options.doctor) {
      optionsMaker.where('doctor', options.doctor);
    }
    if (options.patient) {
      optionsMaker.where('patient', options.patient);
    }
    if (options.clinic) {
      optionsMaker.where('clinic', options.clinic);
    }
    if (options.upcoming) {
      if (options.upcoming === 'true') optionsMaker.gt('date', new Date());
      if (options.upcoming === 'false') optionsMaker.lt('date', new Date());
    }
    const pagination = optionsMaker.pagination(page);
    const appointments = await AppointmentModel.find(
      optionsMaker.filter,
      { createdAt: 1, date: 1 },
      optionsMaker.options,
    )
      .skip(pagination.skip)
      .limit(pagination.limit);
    return appointments;
  }
}

export default AppointmentService;
