import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('app')
export class AppController {

    constructor(
        private appService: AppService,
    ) { }

    @Get()
    async findAll(@Res() response: Response): Promise<void>{
        
        const result = await this.appService.findAll();
        response.status(HttpStatus.OK).json({ Data: result });
    }
}