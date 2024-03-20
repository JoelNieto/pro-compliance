import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

import { Country } from '../../entities/countries.entity';

export class CreateParticipantDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  document_id: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  @IsDate()
  birth_date: Date;

  @ApiProperty()
  @IsObject()
  birth_country_id: Country;

  @ApiProperty()
  @IsObject()
  residence_country: Country;

  @ApiProperty()
  @IsObject()
  nationality: Country;
}
