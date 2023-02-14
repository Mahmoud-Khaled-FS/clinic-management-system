import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import MedicineService from '../services/medicine';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import { Validate } from '../decorators/validate_body';
import { editMedicineBodyValidation, medicineBodyValidation } from '../validations/medicine.valid';

@Controller()
class MedicineController {
  @Guard({ medicine: Permission.NONE })
  async getAll(req: Request, res: Response) {
    const options = {
      name: req.query.name,
      sort: req.query.sort,
    };
    let page = req.query.page ? +req.query.page?.toString() : 1;
    if (isNaN(page)) page = 1;
    const meds = await MedicineService.getAll(page, options);
    res.status(200).json(meds);
  }
  @Guard({ medicine: Permission.NONE })
  async get(req: Request, res: Response) {
    const med = await MedicineService.getById(req.params.id);
    res.status(200).json(med);
  }
  @Guard({ medicine: Permission.WRITE })
  @Validate(medicineBodyValidation)
  async create(req: Request, res: Response) {
    const med = await MedicineService.create(req.body, req.userId!);
    res.status(201).json(med);
  }
  @Guard({ medicine: Permission.ALL })
  @Validate(editMedicineBodyValidation)
  async edit(req: Request, res: Response) {
    const med = await MedicineService.edit(req.params.id, req.body);
    res.status(200).json(med);
  }
  @Guard({ medicine: Permission.ALL })
  async delete(req: Request, res: Response) {
    await MedicineService.delete(req.params.id);
    res.sendStatus(204);
  }
}

export default new MedicineController();
