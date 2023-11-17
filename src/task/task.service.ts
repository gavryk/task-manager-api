import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAllTasks() {
		const tasks = await this.prisma.task.findMany();
		return tasks;
	}

	async getUserTasks(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId: userId,
			},
		});
	}
}
