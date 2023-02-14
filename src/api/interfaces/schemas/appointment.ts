import { Schema, PopulatedDoc, Document } from 'mongoose';
import { EmployeeSchema } from './employee';
import { ClinicSchema } from './clinic';
import { PatientSchema } from './patient';

export interface AppointmentSchema {
  date: Date;
  clinic: PopulatedDoc<Document<Schema.Types.ObjectId> & ClinicSchema>;
  patient: PopulatedDoc<Document<Schema.Types.ObjectId> & PatientSchema>;
  doctor: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
}
