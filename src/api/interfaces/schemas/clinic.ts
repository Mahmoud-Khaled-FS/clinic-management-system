import { Document, PopulatedDoc, Schema } from 'mongoose';
import { EmployeeSchema } from './employee';

export interface ClinicSchema {
  name: string;
  doctorsId: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>[];
  services: ClinicServices[];
}

export interface ClinicServices {
  name: string;
  description: string;
  price?: number;
}
