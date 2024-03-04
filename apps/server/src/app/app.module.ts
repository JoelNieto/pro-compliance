import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';
import { Country } from './entities/countries.entity';
import { Participant } from './entities/participant.entity';
import { User } from './entities/user.entity';
import { ParticipantsModule } from './participants/participants.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'joelnieto',
      entities: [User, Country, Participant],
      database: 'pro-compliance',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    ParticipantsModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
