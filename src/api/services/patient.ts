import PatientModel from '../models/patient.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { EditPatientBody, PatientBody } from '../validations/patient.valid';

class PatientService {
  static async create(patientData: PatientBody) {
    const patient = new PatientModel({
      ...patientData,
    });
    return await patient.save();
  }
  static async edit(id: string, data: EditPatientBody) {
    const patient = await PatientModel.findByIdAndUpdate(id, data);
    if (!patient) {
      throw new ServerError('patient not found', 400);
    }
    return patient.save();
  }
  static async delete(id: string) {
    await PatientModel.findByIdAndRemove(id);
    return;
  }
  static async getById(id: string) {
    const patient = await PatientModel.findById(id).populate('doctor');
    if (!patient) {
      throw new ServerError('patient not found', 404);
    }
    return patient;
  }
  static async getAll(page: number, options: any) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('firstName', options.sort);
    optionsMaker.startWith('firstName', options.name);
    const pagination = optionsMaker.pagination(page);
    const patients = await PatientModel.find(
      optionsMaker.filter,
      { firstName: 1, lastName: 1, _id: 1 },
      optionsMaker.options,
    )
      .skip(pagination.skip)
      .limit(pagination.limit);
    return patients;
  }
}

export default PatientService;
