import { Document, PopulatedDoc, Schema } from 'mongoose';
import { EmployeeSchema } from './employee';
import { PatientSchema } from './patient';

export interface PrescriptionSchema {
  medicinesIds?: PopulatedDoc<Document<Schema.Types.ObjectId> & MedicineSchema>[] | string;
  medicines?: string[];
  doctorId: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
  patientId: PopulatedDoc<Document<Schema.Types.ObjectId> & PatientSchema>;
}
export interface MedicineSchema {
  title: string;
  description?: string;
  price: number;
}
