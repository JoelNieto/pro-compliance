import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../auth/public.decorator';
import { Participant } from '../entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ParticipantsService } from './participants.service';

@ApiTags('participants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}
  @Public()
  @Post()
  public create(
    @Body() createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    return this.participantsService.create(createParticipantDto);
  }

  @Public()
  @Get()
  public findAll(): Promise<Participant[]> {
    return this.participantsService.findAll();
  }

  @Public()
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<Participant> {
    return this.participantsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto
  ): Promise<Participant> {
    return this.participantsService.update({ id, updateParticipantDto });
  }

  @Public()
  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
