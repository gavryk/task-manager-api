import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.setGlobalPrefix('api');
	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	});
	await app.listen(3333);
}
bootstrap();
