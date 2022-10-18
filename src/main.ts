import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllException} from './config/exception/exception.filter';
import { LoggingInterceptor } from './config/logger/logging.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix('/api');
	app.useGlobalFilters(new AllException());
    app.useGlobalInterceptors(new LoggingInterceptor());

	await app.listen(process.env.SERVER_PORT);
}
bootstrap();