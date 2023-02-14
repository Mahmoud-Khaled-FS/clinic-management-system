import { Document, PopulatedDoc, Schema } from 'mongoose';
import { PatientSchema } from './patient';

export interface InvoiceSchema {
  paymentMethod: 'cash' | 'visa';
  discount: number;
  description: string;
  totalPrice: number;
  patient: PopulatedDoc<Document<Schema.Types.ObjectId> & PatientSchema>;
}
