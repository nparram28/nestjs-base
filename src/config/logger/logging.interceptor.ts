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
        const body = request.body ? JSON.stringify(request.body) : 'Not Body';

        const message = `[${method}] [${url}] [${body}]`;

        return next.handle().pipe(
            tap(() => {
                Logger.log(message);
            }),
            catchError((error)=> {
                Logger.error(message);
                throw new InternalServerErrorException(error);
            }),
        );
    }
}
