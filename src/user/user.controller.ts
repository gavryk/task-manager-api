import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from '../decorators';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
	constructor(private prisma: PrismaService) {}

	@UseGuards(JwtGuard)
	@Get('me')
	getMe(@GetUser() user: User) {
		return user;
	}

	@Get()
	getAllUsers() {
		return this.prisma.user.findMany();
	}
}
