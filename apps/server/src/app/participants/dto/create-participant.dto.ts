import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

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
  @IsNotEmpty()
  document_id: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  @IsDateString()
  birth_date: Date;

  @ApiProperty()
  @IsUUID()
  birth_country_id: string;

  @ApiProperty()
  @IsUUID()
  residence_country_id: string;

  @ApiProperty()
  @IsUUID()
  nationality_country_id: string;
}
