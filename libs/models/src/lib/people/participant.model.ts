import { EntityBase } from '../models';
import { Country } from './country.model';

export type Participant = EntityBase & {
  first_name: string;
  last_name: string;
  birth_date: Date;
  document_id: string;
  residence_country: Country;
  nationality: Country;
  birth_country: Country;
  gender: 'female' | 'male' | 'nb';
  email: string;
  address: string;
};
