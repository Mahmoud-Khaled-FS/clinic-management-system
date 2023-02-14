import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import Clinic from '../services/clinic';
import { Validate } from '../decorators/validate_body';
import { clinicBodyValidation } from '../validations/clinic.valid';

@Controller()
class ClinicControllers {
  @Guard({ clinic: Permission.READ })
  public async getAll(req: Request, res: Response) {
    const options = {
      name: req.query.name,
      sort: req.query.sort,
    };
    const clinics = await Clinic.getAll(options);
    res.status(200).json(clinics);
  }
  @Guard({ clinic: Permission.READ })
  public async getById(req: Request, res: Response) {
    const clinic = await Clinic.getById(req.params.id);
    res.status(200).json(clinic);
  }
  @Guard({ clinic: Permission.WRITE })
  @Validate(clinicBodyValidation)
  public async create(req: Request, res: Response) {
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  }
  @Guard({ clinic: Permission.ALL })
  @Validate(clinicBodyValidation)
  public async edit(req: Request, res: Response) {
    const clinic = await Clinic.edit(req.params.id, req.body);
    res.status(200).json(clinic);
  }
  @Guard({ clinic: Permission.ALL })
  public async delete(req: Request, res: Response) {
    await Clinic.delete(req.params.id);
    res.sendStatus(204);
  }
}

export default new ClinicControllers();
