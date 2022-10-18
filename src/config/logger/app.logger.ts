import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from 'winston';
import 'winston-daily-rotate-file';

export class AppLogger implements LoggerService {
    private logger: Logger;

    constructor() {
        const transport = new winston.transports.DailyRotateFile({
            filename: `${process.env.PATH_LOG_ERROR}${process.env.TITLE}_%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            frequency: '1d',
        });

        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.metadata({
                    fillExcept: ['message', 'level', 'timestamp', 'label'],
                }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD-HH:mm:ss',
                }),
                winston.format.printf(info => {
                    return `[${info.timestamp}][${
                        process.env.TITLE
                    }][${info.level.toUpperCase()}][${info.metadata.context}][${
                        info.message
                    }]`;
                }),
            ),
            transports: [transport],
            exitOnError: false,
        });
    }

    error(message: string, context?: string): void {
        this.logger.error(message, { context });
    }

    warn(message: string, context?: string): void {
        this.logger.warn(message, { context });
    }

    info(message: string, context?: string): void {
        this.logger.info(message, { context });
    }

    log(message: string, context?: string): void {
        this.logger.debug(message, { context });
    }
}
