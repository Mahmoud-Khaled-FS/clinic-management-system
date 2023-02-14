import DoctorProfileModel from '../models/doctor_profile.model';
import EmployeeModel from '../models/employee.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { EmployeeBody, doctorProfileBody, editDoctorProfileBody } from '../validations/employee.valid';
import EmployeeService from './employee';

class Doctor {
  static async create(data: EmployeeBody) {
    const doctor = await EmployeeService.create(data, 'doctor');
    return doctor;
  }
  static async createProfile(id: string, data: doctorProfileBody) {
    const doctor = await EmployeeService.get(id);
    const profile = new DoctorProfileModel(data);
    if (!doctor.isDoctor) throw new Error('employee is not a doctor');
    await profile.save();
    doctor.profileId = profile._id;
    await doctor.save();
    return profile;
  }
  static async getDoctorById(id: string) {
    const doctor = await EmployeeModel.findById(id).where({ isDoctor: true }).populate('profileId');
    if (!doctor) {
      throw new ServerError('Doctor not founded', 404);
    }
    return doctor;
  }
  static async getAll(page: number, options: any) {
    const ePerFetch = 10;
    const skipEmployee = (page - 1) * ePerFetch;
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('firstName', options.sort);
    optionsMaker.startWith('firstName', options.name);
    optionsMaker.startWith('email', options.email);
    optionsMaker.where('isDoctor', true);
    const doctors = await EmployeeModel.find(
      optionsMaker.filter,
      { firstName: 1, lastName: 1, _id: 1 },
      optionsMaker.options,
    )
      .skip(skipEmployee)
      .limit(ePerFetch)
      .populate('profileId');
    return doctors;
  }
  static async editProfile(id: string, data: editDoctorProfileBody) {
    const doctor = await EmployeeService.get(id);
    if (!doctor.isDoctor) throw new Error('employee is not a doctor');
    const profile = await DoctorProfileModel.findByIdAndUpdate(doctor.profileId, data);
    return profile;
  }
}

export default Doctor;
