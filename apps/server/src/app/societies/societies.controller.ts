import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public.decorator';
import { Society } from '../entities/society.entity';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';
import { SocietiesService } from './societies.service';

@ApiTags('societies')
@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}

  @Public()
  @Post()
  public create(
    @Body() createSocietyDto: CreateSocietyDto
  ): Promise<CreateSocietyDto> {
    return this.societiesService.create(createSocietyDto);
  }

  @Public()
  @Get()
  public findAll(
    @Query('participant') participant?: string
  ): Promise<Society[]> {
    return this.societiesService.findAll(participant);
  }

  @Public()
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Society> {
    return this.societiesService.findOne(id);
  }

  @Public()
  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateSocietyDto: UpdateSocietyDto
  ): Promise<Society> {
    return this.societiesService.update({ id: id, updateSocietyDto });
  }

  @Public()
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.societiesService.remove(id);
  }
}
