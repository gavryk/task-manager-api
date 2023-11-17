import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	}

	async updateUser(id: string, dto: UserDto) {
		return { id, dto };
	}

	async toggleTask(id: string, taskId: string) {
		return { id, taskId };
	}
}
