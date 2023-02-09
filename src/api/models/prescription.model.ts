import mongoose from 'mongoose';
import { PrescriptionSchema } from '../interfaces/schemas/prescription';

const patientSchema = new mongoose.Schema<PrescriptionSchema>({
  medicinesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
  medicines: [String],
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient',
  },
});

export default mongoose.model('Patient', patientSchema);
