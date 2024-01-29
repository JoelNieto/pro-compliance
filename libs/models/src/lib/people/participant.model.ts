import { EntityBase } from '../models';

export type Participant = EntityBase & {
  first_name: string;
  middle_name: string;
  father_name: string;
  mother_name: string;
  birth_date: Date;
  document_id: string;
  country_id: string;
};
