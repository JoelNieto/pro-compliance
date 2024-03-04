import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public.decorator';
import { Country } from '../entities/countries.entity';
import { CountriesService } from './countries.service';

@Controller('countries')
@ApiTags('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Public()
  @Get()
  public findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }
}
