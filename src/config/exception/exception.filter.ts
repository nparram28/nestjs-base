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
    catch(exception: unknown, host: ArgumentsHost) {
        const logger: AppLogger = new AppLogger();
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        logger.error(JSON.stringify(exception), ctx.getRequest().url);
        Logger.error(
            JSON.stringify(exception),
            null,
            'AllException',
            false,
        );

        const apiResponse = JSON.parse(JSON.stringify(exception)).response
            .response;

        const status =
            exception instanceof HttpException
                ? apiResponse
                    ? apiResponse.apiCode
                        ? apiResponse.apiCode
                        : apiResponse.statusCode
                        ? apiResponse.statusCode
                        : HttpStatus.INTERNAL_SERVER_ERROR
                    : HttpStatus.INTERNAL_SERVER_ERROR
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let statusResponse = HttpStatus.INTERNAL_SERVER_ERROR;

        if (!Object.values(HttpStatus).includes(status)) {
            statusResponse = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            statusResponse = status;
        }

        response.status(statusResponse).json({
            apiCode: status,
            apiMessage: apiResponse
                ? apiResponse.apiMessage
                    ? apiResponse.apiMessage
                    : apiResponse.message
                    ? apiResponse.message
                    : 'Error'
                : 'Error',
            apiResponse: apiResponse
                ? apiResponse.apiReason
                    ? apiResponse.apiReason
                    : apiResponse.error
                    ? apiResponse.error
                    : 'Error'
                : 'Error',
        });
    }
}
