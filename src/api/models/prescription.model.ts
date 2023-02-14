import mongoose from 'mongoose';
import { PrescriptionSchema } from '../interfaces/schemas/prescription';

const prescriptionSchema = new mongoose.Schema<PrescriptionSchema>(
  {
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Prescription', prescriptionSchema);
