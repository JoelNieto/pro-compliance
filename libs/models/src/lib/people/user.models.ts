import { EntityBase } from '../models';

export type User = EntityBase & {
  user_name: string;
  email: string;
  password: string;
};
