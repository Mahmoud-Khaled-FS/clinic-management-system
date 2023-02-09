import { Document, PopulatedDoc, Schema } from 'mongoose';
import { Gender } from '../common';
import { EmployeeSchema } from './employee';

export interface PatientSchema {
  firstName?: string;
  lastName?: string;
  age?: number;
  address?: string;
  phoneNumber?: string;
  gender?: Gender;
  disease?: {
    name: string;
    description: string;
  };
  doctorId: PopulatedDoc<Document<Schema.Types.ObjectId> & EmployeeSchema>;
}
