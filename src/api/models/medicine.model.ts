import mongoose from 'mongoose';
import { MedicineSchema } from '../interfaces/schemas/prescription';

const medicineSchema = new mongoose.Schema<MedicineSchema>({
  title: {
    required: true,
    type: String,
  },
  description: String,
  price: {
    default: 0,
    type: Number,
  },
  addedBy: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

export default mongoose.model('Medicine', medicineSchema);
