import mongoose from 'mongoose';
import { EmployeeSchema } from '../interfaces/schemas/employee';
import { employeeDefaultPermission } from '../interfaces/permissions';
const typeString = {
  required: true,
  type: String,
};
const typePermissions = {
  apppointment: Number,
  doctors: Number,
  patient: Number,
  medicine: Number,
  clinic: Number,
  employee: Number,
  prescription: Number,
  reports: Number,
  invoice: Number,
  permissions: Number,
};

const employeeSchema = new mongoose.Schema<EmployeeSchema>(
  {
    email: typeString,
    password: typeString,
    firstName: typeString,
    middleName: String,
    lastName: typeString,
    about: String,
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
    employeeType: String,
    hrsPerDay: Number,
    picture: String,
    phoneNumber: String,
    salary: Number,
    jopTitle: String,
    role: {
      type: String,
      default: 'employee',
    },
    permissions: {
      type: typePermissions,
      default: employeeDefaultPermission,
      _id: false,
    },
    isDoctor: Boolean,
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor_Profile' },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Employee', employeeSchema);
