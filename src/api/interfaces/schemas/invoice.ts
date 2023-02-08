import { Schema } from 'mongoose';

export interface InvoiceSchema {
  paymentMethod: 'cash' | 'visa';
  discount: number;
  description: string;
  totalPrice: number;
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
}
