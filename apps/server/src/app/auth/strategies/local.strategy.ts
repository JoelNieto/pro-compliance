import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.auth.signIn(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
