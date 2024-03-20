import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Society } from '../entities/society.entity';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';
import { SocietiesService } from './societies.service';

@ApiTags('societies')
@Controller('societies')
export class SocietiesController {
  constructor(private readonly societiesService: SocietiesService) {}

  @Post()
  public create(
    @Body() createSocietyDto: CreateSocietyDto
  ): Promise<CreateSocietyDto> {
    return this.societiesService.create(createSocietyDto);
  }

  @Get()
  public findAll(): Promise<Society[]> {
    return this.societiesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Society> {
    return this.societiesService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateSocietyDto: UpdateSocietyDto
  ): Promise<Society> {
    return this.societiesService.update({ id: id, updateSocietyDto });
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.societiesService.remove(id);
  }
}
