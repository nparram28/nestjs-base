import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppLogger } from '../logger/app.logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const logger: AppLogger = new AppLogger();
        const request = context.switchToHttp().getRequest();

        const method = request.method;
        const url = request.originalUrl;
        const body = JSON.stringify(request.body);
        const params = JSON.stringify(request.params);
        const query = JSON.stringify(request.query);

        const message = `[${url}] [${method}] [Params: ${params}] [Query: ${query}] [Body: ${body}]`;

        return next.handle().pipe(
            tap(() => {
                Logger.log(message);
                logger.info(message);
            }),
            catchError(error => {
                Logger.error(message);
                throw new InternalServerErrorException(error);
            }),
        );
    }
}
