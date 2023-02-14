import employeeModel from '../models/employee.model';
import patientModel from '../models/patient.model';
import PrescriptionModel from '../models/prescription.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { PrescriptionBody } from '../validations/prescription.valid';

class PrescriptionService {
  static async create(prescriptionData: PrescriptionBody) {
    const doc = await employeeModel.findById(prescriptionData.doctor);
    if (!doc) throw new ServerError('Doctor Not found', 401);
    const patient = await patientModel.findById(prescriptionData.patient);
    if (!patient) throw new ServerError('Patient Not found', 401);
    const prescription = new PrescriptionModel(prescriptionData);
    return await prescription.save();
  }

  static async delete(id: string) {
    await PrescriptionModel.findByIdAndRemove(id);
    return;
  }

  static async getById(id: string) {
    const prescription = await PrescriptionModel.findById(id).populate(['doctor', 'patient', 'medicines']);
    if (!prescription) {
      throw new ServerError('prescription not found', 404);
    }
    return prescription;
  }

  static async getAll(page: number, options: any, docId?: string) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('createdAt', options.sort);
    if (docId) {
      optionsMaker.where('doctor', docId);
    }
    const pagination = optionsMaker.pagination(page);
    const prescriptions = await PrescriptionModel.find(optionsMaker.filter, {}, optionsMaker.options)
      .skip(pagination.skip)
      .limit(pagination.limit);
    return prescriptions;
  }
}

export default PrescriptionService;
