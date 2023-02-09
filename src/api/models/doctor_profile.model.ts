import mongoose from 'mongoose';
import { DoctorProfileSchema } from '../interfaces/schemas/employee';

const doctorProfileSchema = new mongoose.Schema<DoctorProfileSchema>({
  specialty: {
    required: true,
    type: String,
  },
  timesOfWork: {
    type: {
      sunday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      monday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      tuesday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      wednesday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      thursday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      friday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
      saturday: {
        type: {
          startFrom: Number,
          endAt: Number,
        },
      },
    },
  },
});

export default mongoose.model('Doctor_Profile', doctorProfileSchema);
