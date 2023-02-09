import mongoose from 'mongoose';
import { InvoiceSchema } from '../interfaces/schemas/invoice';

const invoiceSchema = new mongoose.Schema<InvoiceSchema>({
  paymentMethod: {
    required: true,
    type: String,
  },
  discount: Number,
  description: String,
  totalPrice: {
    required: true,
    type: Number,
  },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

export default mongoose.model('Invoice', invoiceSchema);
