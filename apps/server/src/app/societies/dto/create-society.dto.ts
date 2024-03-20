import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { Country } from '../../entities/countries.entity';
import { Participant } from '../../entities/participant.entity';

export class CreateSocietyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  code: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  commercial_name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  account_number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  ruc: string;

  @ApiProperty()
  @IsDate()
  registration_date: Date;

  @ApiProperty()
  @IsObject()
  jurisdiction: Country;

  @ApiProperty()
  @IsObject()
  owner: Participant;
}
