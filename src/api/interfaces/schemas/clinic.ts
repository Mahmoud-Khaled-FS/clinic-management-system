import { Schema } from 'mongoose';

export interface ClinicSchema {
  name: string;
  doctorsId: Schema.Types.ObjectId[];
  services: Schema.Types.ObjectId[];
}

export interface ClinicServicesSchema {
  name: string;
  description: string;
  price?: number;
}
