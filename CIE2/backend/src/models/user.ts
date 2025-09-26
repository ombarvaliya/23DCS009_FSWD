export type UserType = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

export const users: User[] = [];
