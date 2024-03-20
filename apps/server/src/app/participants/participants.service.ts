import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Participant } from '../entities/participant.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>
  ) {}
  public create(
    createParticipantDto: CreateParticipantDto
  ): Promise<Participant> {
    return this.participantRepository.save(createParticipantDto);
  }

  public findAll(): Promise<Participant[]> {
    return this.participantRepository.find({
      relations: ['birth_country', 'residence_country', 'nationality'],
    });
  }

  public findOne(id: string): Promise<Participant> {
    return this.participantRepository.findOneBy({ id });
  }

  public update({
    id,
    updateParticipantDto,
  }: {
    id: string;
    updateParticipantDto: UpdateParticipantDto;
  }): Promise<Participant> {
    let participant = new Participant();
    participant = { ...participant, ...updateParticipantDto, id };
    return this.participantRepository.save(participant);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.participantRepository.delete(id);
  }
}
