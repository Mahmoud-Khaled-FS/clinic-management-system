import { compare } from 'bcryptjs';
import EmployeeModel from '../models/employee.model';
import ServerError from '../util/errors';
import { LoginBody } from '../validations/auth.valid';
import * as jwt from 'jsonwebtoken';
import { SECRET_TOKEN_KEY } from '../../config/constant';

export default class AuthService {
  static async login(data: LoginBody) {
    const user = await EmployeeModel.findOne({ email: data.email });

    if (!user) {
      throw new ServerError('User not found', 400);
    }
    const isCorrectPassword = await compare(data.password, user.password);
    if (!isCorrectPassword) {
      throw new ServerError('incorrect password', 401);
    }
    const token = jwt.sign({ id: user._id }, SECRET_TOKEN_KEY);
    return {
      token: token,
      data: user,
    };
  }
}
