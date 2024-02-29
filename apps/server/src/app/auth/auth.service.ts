import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
    private jwtService: JwtService
  ) {}

  public async signIn(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };

    Logger.log('🚀 Logged successfully');

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
