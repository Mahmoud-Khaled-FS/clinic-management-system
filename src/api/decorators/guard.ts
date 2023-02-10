import { SelectedRolePermission } from '../interfaces/permissions';
import ServerError from '../util/errors';

export const Guard = (roles: SelectedRolePermission) => {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;
    descriptor.value = (...args: any) => {
      const [req] = args;
      if (!req.user) {
        throw new ServerError('something wrong');
      }
      if (Object.keys(roles).length === 0) {
        throw new ServerError('something wrong');
      }
      for (const key of Object.keys(roles) as Array<keyof typeof roles>) {
        if (roles[key]! > req.user.permissions[key]) {
          throw new ServerError('Unauthorized Error!', 401);
        }
      }
      return fn.apply(this, args);
    };
    return descriptor;
  };
};
