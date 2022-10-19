import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AppMessages } from './app/messages/app.messages';
import { AppNotFoundException } from './app/exceptions/appNotFoundException.exception';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),HttpModule],
    providers: [AppService, AppMessages, AppNotFoundException],
    controllers: [AppController],
  })
  export class AppModule {}