import { Country } from './country.model';
import { Participant } from './participant.model';

export type Society = {
  id: string;
  code: string;
  commercial_name: string;
  account_number: string;
  ruc: string;
  registration_date: Date;
  jurisdiction: Country;
  owner: Participant;
  created_at: Date;
};
