import mongoose from 'mongoose';
import { InvoiceSchema } from '../interfaces/schemas/invoice';

const invoiceSchema = new mongoose.Schema<InvoiceSchema>(
  {
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
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  },
  { timestamps: true },
);

export default mongoose.model('Invoice', invoiceSchema);
