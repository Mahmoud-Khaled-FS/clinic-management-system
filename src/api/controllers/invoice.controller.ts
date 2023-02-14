import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import { Validate } from '../decorators/validate_body';
import { invoiceBodyValidation } from '../validations/invoice.valid';
import InvoiceService from '../services/invoice';

@Controller()
class InvoiceController {
  @Guard({ invoice: Permission.READ })
  async getAll(req: Request, res: Response) {
    const options = {
      name: req.query.name,
      sort: req.query.sort,
    };
    let page = req.query.page ? +req.query.page?.toString() : 1;
    if (isNaN(page)) page = 1;
    const invoices = await InvoiceService.getAll(page, options, req.query.patient as string);
    res.status(200).json(invoices);
  }
  @Guard({ invoice: Permission.READ })
  async get(req: Request, res: Response) {
    const invoice = await InvoiceService.getById(req.params.id);
    res.status(200).json(invoice);
  }
  @Guard({ invoice: Permission.WRITE })
  @Validate(invoiceBodyValidation)
  async create(req: Request, res: Response) {
    const data = req.body;
    const invoice = await InvoiceService.create(data);
    res.status(201).json(invoice);
  }
}

export default new InvoiceController();
