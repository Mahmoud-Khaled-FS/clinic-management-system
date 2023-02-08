import { Schema } from 'mongoose';
import { Gender } from '../common';
import { RolePremission, UserRole } from '../permissions';

interface EmployeeInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  about: string;
  dateOfBirth: Date;
  gender: Gender;
  address: {
    city: string;
    zip: number;
    address1: string;
    address2?: string;
  };
  employeeType: 'full-time' | 'part-time';
  hrsPerDay: number;
  picture: string;
  phoneNumber: string;
  salary: string;
  jopTitle: string;
  role: UserRole;
  premissions: RolePremission;
}
interface NonDoctor extends EmployeeInfo {
  isDoctor: false;
}

interface Doctor extends EmployeeInfo {
  isDoctor: true;
  profileId: Schema.Types.ObjectId;
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
