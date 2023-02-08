import { Schema } from 'mongoose';

export interface PrescriptionSchema {
  medicinesIds: Schema.Types.ObjectId[];
  doctorId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
}
export interface MedicineSchema {
  title: string;
  description: string;
  price: number;
}
