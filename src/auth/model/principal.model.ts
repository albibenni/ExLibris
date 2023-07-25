import { ROLES } from '../roles';

interface Principal {
  id: string;
  refreshToken: string;
  email: string;
  firstName: string;
  familyName: string;
  roles: string[];
}
export interface TokenData {
  id: string;
  refreshToken: string;
  email: string;
  firstName: string;
  familyName: string;
  roles: string[];
}

export default Principal;

export const isAdmin = (user: Principal): boolean =>
  user.roles.includes(ROLES.ADMIN);

export const isManager = (user: Principal): boolean =>
  user.roles.includes(ROLES.MANAGER);

export const isAffiliateUser = (user: Principal): boolean =>
  user.roles.includes(ROLES.AFFILIATE_USER);

export const isSimpleUser = (user: Principal): boolean =>
  user.roles.includes(ROLES.SIMPLE_USER);
