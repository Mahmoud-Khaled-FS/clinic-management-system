import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import { Validate } from '../decorators/validate_body';
import { appointmentBodyValidation } from '../validations/appointment.valid';
import AppointmentService from '../services/appointment';

@Controller()
class AppointmentController {
  @Guard({ appointment: Permission.READ })
  async getAll(req: Request, res: Response) {
    const options = {
      doctor: req.query.doctor,
      patient: req.query.patient,
      clinic: req.query.clinic,
      upcoming: req.query.upcoming,
      sort: req.query.sort,
    };
    let page = req.query.page ? +req.query.page?.toString() : 1;
    if (isNaN(page)) page = 1;
    const appointments = await AppointmentService.getAll(page, options);
    res.status(200).json(appointments);
  }
  @Guard({ appointment: Permission.READ })
  async get(req: Request, res: Response) {
    const appointment = await AppointmentService.getById(req.params.id);
    res.status(200).json(appointment);
  }
  @Guard({ appointment: Permission.WRITE })
  @Validate(appointmentBodyValidation)
  async create(req: Request, res: Response) {
    const data = req.body;
    const appointment = await AppointmentService.create(data);
    res.status(201).json(appointment);
  }
  @Guard({ appointment: Permission.WRITE })
  @Validate(appointmentBodyValidation)
  async delete(req: Request, res: Response) {
    const data = req.body;
    const appointment = await AppointmentService.delete(data);
    res.status(201).json(appointment);
  }
}

export default new AppointmentController();
