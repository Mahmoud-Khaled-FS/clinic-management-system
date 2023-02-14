import { Request, Response } from 'express';
import { Controller } from '../decorators/controller';
import { Guard } from '../decorators/guard';
import { Permission } from '../interfaces/permissions';
import Report from '../services/report';

@Controller()
class ReportController {
  @Guard({ reports: Permission.READ })
  async getAppointmentReport(req: Request, res: Response) {
    const options = {
      month: Report.checkMonth(req.query.month),
      year: Report.checkYear(req.query.year),
    };
    if (req.query.pdf === 'true') {
      const report = await Report.appointmentReportPDF(options);
      report.pipe(res);
      report.end();
    } else {
      const report = await Report.appointmentReport(options);
      res.status(200).json(report);
    }
  }

  @Guard({ reports: Permission.READ })
  async getInvoiceReport(req: Request, res: Response) {
    const options = {
      month: Report.checkMonth(req.query.month),
      year: Report.checkYear(req.query.year),
    };
    if (req.query.pdf === 'true') {
      const report = await Report.invoiceReportPDF(options);
      report.pipe(res);
      report.end();
    } else {
      const report = await Report.invoiceReport(options);
      res.status(200).json(report);
    }
  }
}

export default new ReportController();
