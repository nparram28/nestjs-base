import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AppMessages } from './messages/app.messages';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BaseNestJs')
@Controller('app')
export class AppController {

    constructor(
        private appService: AppService,
        private appMessages: AppMessages
    ) { }

    @Get('findAll')
    async findAll(@Res() response: Response): Promise<void>{
        
        const result = await this.appService.findAll();
        response.status(HttpStatus.OK).json(this.appMessages.returnDataSuccessfully(result));
    }

    @Get('find')
    async find(@Res() response: Response): Promise<void>{
        
        const result = await this.appService.find();
        response.status(HttpStatus.OK).json(this.appMessages.returnDataSuccessfully(result));
    }
}