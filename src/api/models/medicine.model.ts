import mongoose from 'mongoose';
import { MedicineSchema } from '../interfaces/schemas/prescription';

const medicineSchema = new mongoose.Schema<MedicineSchema>({
  title: {
    required: true,
    type: String,
  },
  description: String,
  price: {
    required: true,
    type: Number,
  },
});

export default mongoose.model('Medicine', medicineSchema);
