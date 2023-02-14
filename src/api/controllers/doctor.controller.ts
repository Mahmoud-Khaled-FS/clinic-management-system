import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import Doctor from '../services/doctor';
import {
  doctorProfileBodyValidation,
  editDoctorProfileBodyValidation,
  employeeBodyValidation,
} from '../validations/employee.valid';
import { Validate } from '../decorators/validate_body';

@Controller()
class DoctorController {
  @Guard({ doctors: Permission.READ })
  async getDoctors(req: Request, res: Response) {
    let { page, sort, name, email } = req.query;
    page = page ? page : '1';
    const options = { sort: sort, name, email };
    const doctors = await Doctor.getAll(+page, options);
    return res.status(200).json(doctors);
  }
  @Guard({ doctors: Permission.READ })
  public async getById(req: Request, res: Response) {
    const employee = await Doctor.getDoctorById(req.params.id);
    return res.status(200).json(employee);
  }
  @Guard({ doctors: Permission.WRITE })
  @Validate(employeeBodyValidation)
  public async createDoctor(req: Request, res: Response) {
    const doctor = await Doctor.create(req.body);
    return res.status(201).json(doctor);
  }
  @Guard({ doctors: Permission.WRITE })
  @Validate(doctorProfileBodyValidation)
  public async createProfile(req: Request, res: Response) {
    const doctor = await Doctor.createProfile(req.params.id, req.body);
    return res.status(201).json(doctor);
  }
  @Guard({ doctors: Permission.ALL })
  @Validate(editDoctorProfileBodyValidation)
  public async editProfile(req: Request, res: Response) {
    const doctor = await Doctor.editProfile(req.params.id, req.body);
    return res.status(201).json(doctor);
  }
}
export default new DoctorController();
