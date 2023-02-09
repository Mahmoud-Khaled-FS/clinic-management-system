import { Schema, PopulatedDoc, Document } from 'mongoose';
import { EmployeeSchema } from './employee';
import { ClinicSchema } from './clinic';
import { PatientSchema } from './patient';

export interface AppointmentSchema {
  date: {
    hour: number;
    day: number;
    mounth: number;
    year: number;
    time: number;
  };
  clinicId: PopulatedDoc<Document<Schema.Types.ObjectId> & ClinicSchema>;
  patientId: PopulatedDoc<Document<Schema.Types.ObjectId> & PatientSchema>;
  doctorId: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
}
