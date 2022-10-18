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

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const method = request.method;
        const url = request.originalUrl;
        const body = JSON.stringify(request.body);
        const params = JSON.stringify(request.params);
        const query = JSON.stringify(request.query);
        const statusCode = response.statusCode;

        const message = `[${method}] [${url}] [Params: ${params}] [Query: ${query}] [Body: ${body}] [StatusCode: ${statusCode}]`;

        return next.handle().pipe(
            tap(() => {
                Logger.log(message);
            }),
            catchError(error => {
                Logger.error(message);
                throw new InternalServerErrorException(error);
            }),
        );
    }
}
