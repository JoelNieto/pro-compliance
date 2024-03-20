import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { Society } from '../entities/society.entity';
import { CreateSocietyDto } from './dto/create-society.dto';
import { UpdateSocietyDto } from './dto/update-society.dto';

@Injectable()
export class SocietiesService {
  constructor(
    @InjectRepository(Society) private readonly societyRepo: Repository<Society>
  ) {}
  public create(createSocietyDto: CreateSocietyDto): Promise<CreateSocietyDto> {
    return this.societyRepo.save(createSocietyDto);
  }

  public findAll(): Promise<Society[]> {
    return this.societyRepo.find();
  }

  public findOne(id: string): Promise<Society> {
    return this.societyRepo.findOneByOrFail({ id });
  }

  public update({
    id,
    updateSocietyDto,
  }: {
    id: string;
    updateSocietyDto: UpdateSocietyDto;
  }): Promise<Society> {
    let society = new Society();
    society = { ...society, ...updateSocietyDto, id };
    return this.societyRepo.save(society);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.societyRepo.delete(id);
  }
}
