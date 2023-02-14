import MedicineModel from '../models/medicine.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { EditMedicineBody, MedicineBody } from '../validations/medicine.valid';

class MedicineService {
  static async create(medicineData: MedicineBody, userId: string) {
    const medicine = new MedicineModel({
      ...medicineData,
      addedBy: userId,
    });
    return await medicine.save();
  }
  static async edit(id: string, data: EditMedicineBody) {
    const medicine = await MedicineModel.findByIdAndUpdate(id, data);
    if (!medicine) {
      throw new ServerError('medicine not found', 400);
    }
    return medicine.save();
  }
  static async delete(id: string) {
    await MedicineModel.findByIdAndDelete(id);
    return;
  }
  static async getById(id: string) {
    const medicine = await MedicineModel.findById(id).populate('addedBy');
    if (!medicine) {
      throw new ServerError('medicine not found', 404);
    }
    return medicine;
  }
  static async getAll(page: number, options: any) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('title', options.sort);
    optionsMaker.startWith('title', options.name);
    const pagination = optionsMaker.pagination(page);
    const meds = await MedicineModel.find(optionsMaker.filter, { title: 1, addedBy: 1, _id: 1 }, optionsMaker.options)
      .skip(pagination.skip)
      .limit(pagination.limit);
    return meds;
  }
}

export default MedicineService;
