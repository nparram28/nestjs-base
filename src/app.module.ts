import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),HttpModule],
    providers: [AppService],
    controllers: [AppController],
  })
  export class AppModule {}