import PDFDocument from 'pdfkit';
import { InvoiceSchema } from '../interfaces/schemas/invoice';
import { AppointmentSchema } from '../interfaces/schemas/appointment';
class PDF {
  static async invoicesReport(invoices: InvoiceSchema[]) {
    const pdf = new PDFDocument({ size: 'a4', margin: 50 });
    const page = pdf.addPage();
    page.fontSize(25).text('Invoices Report', { align: 'center', height: 80 });
    page.save();
    for (const inv of invoices) {
      //@ts-ignore
      const name = inv.patient?.firstName ? inv.patient?.firstName : 'Unknown';
      page.fontSize(16).text(`${name}     ${inv.paymentMethod}    ${inv.totalPrice}$`);
    }
    return pdf;
  }
  static async appointmentReport(appointment: AppointmentSchema[]) {
    const pdf = new PDFDocument({ size: 'a4', margin: 50 });
    const page = pdf.addPage();
    page.fontSize(25).text('Invoices Report', { align: 'center', height: 80 });
    page.save();
    for (const app of appointment) {
      page
        .fontSize(14)
        //@ts-ignore
        .text(`${app.date.getFullYear()}/${app.date.getMonth()}/${app.date.getDate()}    ${app.doctor.firstName}`);
    }
    return pdf;
  }
}

export default PDF;
