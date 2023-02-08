import { Schema } from 'mongoose';
import { Gender } from '../common';

export interface PatientSchema {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  phoneNumber: string;
  gender: Gender;
  disease: {
    name: string;
    description: string;
  };
  doctorId: Schema.Types.ObjectId;
}
