import { Document, PopulatedDoc, Schema } from 'mongoose';
import { Gender } from '../common';
import { RolePermission, UserRole } from '../permissions';

interface EmployeeInfo {
  email: string;
  password: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  about: string | null;
  dateOfBirth: Date;
  gender: Gender;
  address: {
    city: string;
    zip: number;
    address1: string;
    address2?: string;
  } | null;
  employeeType: 'full-time' | 'part-time';
  hrsPerDay: number | null;
  picture: string | null;
  phoneNumber: string | null;
  salary: number | null;
  jopTitle: string | null;
  role: UserRole;
  permissions: RolePermission;
}
interface NonDoctor extends EmployeeInfo {
  isDoctor: false;
}

interface Doctor extends EmployeeInfo {
  isDoctor: true;
  profileId: PopulatedDoc<Document<Schema.Types.ObjectId> & DoctorProfileSchema>;
}
export type EmployeeSchema = Doctor | NonDoctor;

export interface DoctorProfileSchema {
  specialty: string;
  timesOfWork: {
    sunday: WorkTimeDay;
    monday: WorkTimeDay;
    tuesday: WorkTimeDay;
    wednesday: WorkTimeDay;
    thursday: WorkTimeDay;
    friday: WorkTimeDay;
    saturday: WorkTimeDay;
  };
}
type WorkTimeDay = {
  startFrom: number;
  endAt: number;
} | null;
