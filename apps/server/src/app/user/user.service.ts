import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    const { user_name, email, password } = createUserDto;

    user = { ...user, user_name, email, password };

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    const { user_name, email, password } = updateUserDto;

    user = { ...user, user_name, email, password, id };
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
