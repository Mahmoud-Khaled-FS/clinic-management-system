import mongoose from 'mongoose';
import { EmployeeSchema } from '../interfaces/schemas/employee';
import { employeeDefaultPremission } from '../interfaces/permissions';
const typeString = {
  required: true,
  type: String,
};
const typePremissions = {
  apppointment: String,
  doctors: String,
  patient: String,
  medicine: String,
  clinic: String,
  employee: String,
  prescription: String,
  reports: String,
  invoice: String,
  permissions: String,
};

const employeeSchema = new mongoose.Schema<EmployeeSchema>({
  email: typeString,
  password: typeString,
  firstName: typeString,
  middleName: typeString,
  lastName: typeString,
  about: typeString,
  dateOfBirth: {
    required: true,
    type: Date,
  },
  gender: typeString,
  address: {
    type: {
      city: String,
      zip: Number,
      address1: String,
      address2: String,
    },
    _id: false,
  },
  employeeType: typeString,
  hrsPerDay: Number,
  picture: String,
  phoneNumber: String,
  salary: Number,
  jopTitle: typeString,
  role: {
    type: String,
    default: 'employee',
  },
  premissions: {
    type: typePremissions,
    default: employeeDefaultPremission,
    _id: false,
  },
  isDoctor: Boolean,
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor_Profile' },
});

export default mongoose.model('Employee', employeeSchema);
