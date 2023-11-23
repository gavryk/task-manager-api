import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { TaskModule } from './task/task.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						user: process.env.GMAIL_ACC,
						pass: process.env.GMAIL_PASS,
					},
				},
				defaults: {
					from: '"Taskapi.app" <modules@nestjs.com>',
				},
				template: {
					dir: __dirname + '/templates/mail',
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
		AuthModule,
		UserModule,
		PrismaModule,
		TaskModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
