import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	//Get All Users
	async getAllUsers() {
		const users = await this.prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				avatarPath: true,
				tasks: { select: { id: true, title: true, description: true, status: true } },
			},
		});
		return users;
	}
	//Get User By Id
	async getUserById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				tasks: { select: { id: true, title: true, description: true, status: true } },
				name: true,
				avatarPath: true,
			},
		});
		return user;
	}
	//Update User
	async updateUser(id: string, dto: UserDto) {
		return { id, dto };
	}
}
