import mongoose from 'mongoose';
import { AppointmentSchema } from '../interfaces/schemas/appointment';

const appointmentSchema = new mongoose.Schema<AppointmentSchema>({
  date: {
    type: {
      day: Number,
      hour: Number,
      mounth: Number,
      year: Number,
      time: Number,
    },
    required: true,
  },
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
});

export default mongoose.model('Appointment', appointmentSchema);
