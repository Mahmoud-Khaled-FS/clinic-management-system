import InvoiceModel from '../models/invoice.model';
import patientModel from '../models/patient.model';
import ServerError from '../util/errors';
import FilterQuery from '../util/filter_sort';
import { InvoiceBody } from '../validations/invoice.valid';

class InvoiceService {
  static async create(invoiceData: InvoiceBody) {
    if (invoiceData.patient) {
      const patient = await patientModel.findById(invoiceData.patient);
      if (!patient) throw new ServerError('Patient Not found', 401);
    }
    const invoice = new InvoiceModel(invoiceData);
    return await invoice.save();
  }
  static async getById(id: string) {
    const invoice = await InvoiceModel.findById(id).populate('patient');
    if (!invoice) {
      throw new ServerError('invoice not found', 404);
    }
    return invoice;
  }
  static async getAll(page: number, options: any, id?: string) {
    const optionsMaker = new FilterQuery();
    optionsMaker.sort('createdAt', options.sort);
    if (id) {
      optionsMaker.where('patient', id);
    }
    const pagination = optionsMaker.pagination(page);
    const invoices = await InvoiceModel.find(optionsMaker.filter, { createdAt: 1, totalPrice: 1 }, optionsMaker.options)
      .skip(pagination.skip)
      .limit(pagination.limit);
    return invoices;
  }
}

export default InvoiceService;
