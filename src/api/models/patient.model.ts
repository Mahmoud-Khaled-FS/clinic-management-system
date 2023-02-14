import mongoose from 'mongoose';
import { PatientSchema } from '../interfaces/schemas/patient';

const patientSchema = new mongoose.Schema<PatientSchema>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  age: Number,
  address: String,
  phoneNumber: String,
  gender: String,
  disease: {
    type: {
      name: String,
      info: String,
    },
  },
  doctor: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
});

export default mongoose.model('Patient', patientSchema);
