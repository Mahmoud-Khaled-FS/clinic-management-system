import { Document, PopulatedDoc, Schema } from 'mongoose';
import { EmployeeSchema } from './employee';
import { PatientSchema } from './patient';

export interface PrescriptionSchema {
  medicines?: PopulatedDoc<Document<Schema.Types.ObjectId> & MedicineSchema>[];
  doctor: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
  patient: PopulatedDoc<Document<Schema.Types.ObjectId> & PatientSchema>;
}
export interface MedicineSchema {
  title: string;
  description?: string;
  price: number;
  addedBy: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
}
