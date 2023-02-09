import { Document, PopulatedDoc, Schema } from 'mongoose';
import { EmployeeSchema } from './employee';

export interface InvoiceSchema {
  paymentMethod: 'cash' | 'visa';
  discount: number;
  description: string;
  totalPrice: number;
  patientId: Schema.Types.ObjectId;
  doctorId: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
}
