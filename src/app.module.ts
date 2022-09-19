import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),HttpModule],
    providers: [],
    controllers: [],
  })
  export class AppModule {}