import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  public async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    const { user_name, email, password } = createUserDto;
    const hash_password = await bcrypt.hash(password, 10);

    user = { ...user, user_name, email, password: hash_password };

    return this.userRepository.save(user);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public update({
    id,
    updateUserDto,
  }: {
    id: string;
    updateUserDto: UpdateUserDto;
  }): Promise<User> {
    let user: User = new User();
    const { user_name, email, password } = updateUserDto;

    user = { ...user, user_name, email, password, id };
    return this.userRepository.save(user);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
