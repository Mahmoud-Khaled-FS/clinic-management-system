import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import { Validate } from '../decorators/validate_body';
import { prescriptionBodyValidation } from '../validations/prescription.valid';
import PrescriptionService from '../services/prescription';

@Controller()
class PrescriptionController {
  @Guard({ prescription: Permission.READ })
  async getAll(req: Request, res: Response) {
    const options = {
      sort: req.query.sort,
    };
    let page = req.query.page ? +req.query.page?.toString() : 1;
    if (isNaN(page)) page = 1;
    const prescriptions = await PrescriptionService.getAll(page, options, req.query.doctor as string);
    res.status(200).json(prescriptions);
  }
  @Guard({ prescription: Permission.READ })
  async get(req: Request, res: Response) {
    const prescription = await PrescriptionService.getById(req.params.id);
    res.status(200).json(prescription);
  }
  @Guard({ prescription: Permission.WRITE })
  @Validate(prescriptionBodyValidation)
  async create(req: Request, res: Response) {
    const data = req.body;
    if (req.user.isDoctor) {
      data.doctor = req.userId;
    }
    const prescription = await PrescriptionService.create(data);
    res.status(201).json(prescription);
  }
  @Guard({ prescription: Permission.ALL })
  async delete(req: Request, res: Response) {
    await PrescriptionService.delete(req.params.id);
    res.sendStatus(204);
  }
}

export default new PrescriptionController();
