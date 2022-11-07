import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AppLogger } from '../logger/app.logger';

@Catch()
export class AllException implements ExceptionFilter {
    constructor(private readonly logger: AppLogger){}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        this.logger.error(exception.toString(), ctx.getRequest().url);
        Logger.error(exception.toString())

        const jsonError = JSON.parse(JSON.stringify(exception));

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const apiMessage = exception instanceof HttpException
            ? exception.message
            : 'Ha ocurrido un error';

        const apiCode = jsonError.response.code ? jsonError.response.code : status;
        const isOperational = jsonError.response.isOperational ? jsonError.response.isOperational : false;

        response.status(status).json({
            apiCode: apiCode,
            apiData: null,
            apiError: true,
            apiErrors: null,
            apiMessage: isOperational ? apiMessage : 'Ha ocurrido un error'
        });
    }
}
