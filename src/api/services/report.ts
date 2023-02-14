import { endOfMonth, endOfYear, startOfMonth, startOfYear } from 'date-fns';
import FilterQuery from '../util/filter_sort';
import AppointmentModel from '../models/appointment.model';
import InvoiceModel from '../models/invoice.model';
import PDF from '../util/pdf';

interface ReportOptions {
  year?: number;
  month: number | 'all';
}

class Report {
  static async appointmentReport(options: ReportOptions) {
    const optionsMaker = new FilterQuery(200);
    let date = Report.dateStartEnd(options);
    optionsMaker.gt('createdAt', date.start);
    optionsMaker.lt('createdAt', date.end);
    const appointments = await AppointmentModel.find(optionsMaker, {}).populate([
      { path: 'doctor', select: ['firstName', 'lastName'] },
      { path: 'clinic', select: 'name' },
      { path: 'patient', select: ['firstName', 'lastName'] },
    ]);
    return appointments;
  }
  static async invoiceReport(options: ReportOptions) {
    const optionsMaker = new FilterQuery(200);
    let date = Report.dateStartEnd(options);
    optionsMaker.gt('createdAt', date.start);
    optionsMaker.lt('createdAt', date.end);
    const invoice = await InvoiceModel.find(optionsMaker, {}).populate({
      path: 'patient',
      select: ['firstName', 'lastName'],
    });
    return invoice;
  }
  static async invoiceReportPDF(options: ReportOptions) {
    return await PDF.invoicesReport(await Report.invoiceReport(options));
  }
  static async appointmentReportPDF(options: ReportOptions) {
    return await PDF.appointmentReport(await Report.appointmentReport(options));
  }
  static checkMonth(month: any) {
    if (!month) {
      return undefined;
    }
    if (isNaN(+month) && month !== 'all') {
      return undefined;
    }
    if (month === 'all' && +month <= 12 && +month >= 1) {
      return month;
    }
    return undefined;
  }
  static checkYear(year: any) {
    if (!year) {
      return 'all';
    }
    if (year >= 2000 && year <= new Date().getFullYear()) {
      return year;
    }
    return 'all';
  }
  private static dateStartEnd(date: ReportOptions): { start: Date; end: Date } {
    let year = date.year || new Date().getFullYear();
    if (date.month === 'all') {
      const d = new Date(`${year}-1-1`);
      return {
        start: startOfYear(d),
        end: endOfYear(d),
      };
      //  `${year}-1-1`;
    } else {
      const d = new Date(`${year}-${date.month}-1`);
      return {
        start: startOfMonth(d),
        end: endOfMonth(d),
      };
    }
  }
}
export default Report;
