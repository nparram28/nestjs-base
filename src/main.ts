import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllException} from './config/exception/exception.filter';
import { LoggingInterceptor } from './config/logger/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

    app.setGlobalPrefix('/api');
	app.useGlobalFilters(new AllException());
    app.useGlobalInterceptors(new LoggingInterceptor());

	const options = new DocumentBuilder()
	.setTitle(process.env.TITLE)
	.setDescription(process.env.DESCRIPTION)
	.setVersion(process.env.VERSION)
	.addTag(process.env.TAG)
	.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api/docs', app, document);

	await app.listen(process.env.SERVER_PORT);
}
bootstrap();