import mongoose from 'mongoose';
import { ClinicSchema } from '../interfaces/schemas/clinic';

const clinicSchema = new mongoose.Schema<ClinicSchema>({
  name: {
    required: true,
    type: String,
  },
  doctorsId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  },
  services: [
    {
      type: {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          default: '',
        },
        price: Number,
      },
    },
  ],
});

export default mongoose.model('Clinic', clinicSchema);
