import mongoose from 'mongoose';
import { AppointmentSchema } from '../interfaces/schemas/appointment';

const appointmentSchema = new mongoose.Schema<AppointmentSchema>(
  {
    date: {
      type: Date,
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Appointment', appointmentSchema);
