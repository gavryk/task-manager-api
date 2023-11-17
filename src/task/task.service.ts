import { Injectable } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
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

	async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
		try {
			const validStatusValues = ['NEW', 'IN_PROGRESS', 'PENDING', 'DONE'];
			if (!validStatusValues.includes(newStatus)) {
				throw new Error('Invalid task status');
			}
			const updatedTask = await this.prisma.task.update({
				where: { id: taskId },
				data: { status: newStatus },
				select: { id: true, title: true, description: true, status: true },
			});
			return updatedTask;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to update task status');
		}
	}
}
