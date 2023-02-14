import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import { Validate } from '../decorators/validate_body';
import { editPatientBodyValidation, patientBodyValidation } from '../validations/patient.valid';
import PatientService from '../services/patient';

@Controller()
class PatientController {
  @Guard({ patient: Permission.READ })
  async getAll(req: Request, res: Response) {
    const options = {
      name: req.query.name,
      sort: req.query.sort,
    };
    let page = req.query.page ? +req.query.page?.toString() : 1;
    if (isNaN(page)) page = 1;
    const meds = await PatientService.getAll(page, options);
    res.status(200).json(meds);
  }
  @Guard({ patient: Permission.READ })
  async get(req: Request, res: Response) {
    const med = await PatientService.getById(req.params.id);
    res.status(200).json(med);
  }
  @Guard({ patient: Permission.WRITE })
  @Validate(patientBodyValidation)
  async create(req: Request, res: Response) {
    const med = await PatientService.create(req.body);
    res.status(201).json(med);
  }
  @Guard({ patient: Permission.ALL })
  @Validate(editPatientBodyValidation)
  async edit(req: Request, res: Response) {
    const med = await PatientService.edit(req.params.id, req.body);
    res.status(200).json(med);
  }
  @Guard({ patient: Permission.ALL })
  async delete(req: Request, res: Response) {
    await PatientService.delete(req.params.id);
    res.sendStatus(204);
  }
}

export default new PatientController();
