import ClinicModel from '../models/clinic.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { ClinicBody } from '../validations/clinic.valid';

export default class Clinic {
  static async create(data: ClinicBody) {
    try {
      const clinic = new ClinicModel({
        name: data.name,
      });
      return await clinic.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ServerError('this name already exist', 400);
      }
      throw err;
    }
  }
  static async edit(id: string, data: ClinicBody) {
    const clinic = await ClinicModel.findOneAndUpdate({ _id: id }, { name: data.name });
    if (!clinic) throw new ServerError('can not found clinic with this id', 401);
    return clinic.save();
  }
  static async delete(id: string) {
    await ClinicModel.findOneAndDelete({ _id: id });
    return;
  }
  static async getById(id: string) {
    const clinic = await ClinicModel.findById(id);
    if (!clinic) throw new ServerError('can not found clinic with this id', 404);
    return clinic;
  }
  static async getAll(options: any) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('createdAt', options.sort);
    optionsMaker.startWith('name', options.name);
    const clinics = await ClinicModel.find(optionsMaker.filter, { name: 1, _id: 1 }, optionsMaker.options);
    return clinics;
  }
  // TODO: Doctors
  // TODO: Services
}
