import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	//Get All Tasks
	async getAllTasks() {
		const tasks = await this.prisma.task.findMany();
		return tasks;
	}

	//Get User Tasks
	async getUserTasks(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId: userId,
			},
		});
	}

	//Get Tasks By Status
	async getTasksByStatus(status: TaskStatus): Promise<Task[]> {
		try {
			const tasks = await this.prisma.task.findMany({ where: { status } });
			return tasks;
		} catch (error) {
			throw new NotFoundException(`Task with status ${status} not found`);
		}
	}

	//Create Task
	async createTask(dto: CreateTaskDto): Promise<Task | { success: boolean; error: string }> {
		try {
			const { title, description, status, userId } = dto;
			const newTask = await this.prisma.task.create({
				data: {
					title,
					description,
					status,
					users: { connect: { id: userId } },
				},
			});
			return newTask;
		} catch (error) {
			return { success: false, error: error.message };
		}
	}

	//Update Task
	async updateTask(taskId: string, dto: UpdateTaskDto) {
		try {
			const updatedTask = await this.prisma.task.update({
				where: { id: taskId },
				data: dto,
			});
			if (!updatedTask) {
				throw new NotFoundException(`Task with ID ${taskId} not found`);
			}
			return updatedTask;
		} catch (error) {
			throw new Error(`Unable to update task: ${error.message}`);
		}
	}

	//Update Status
	async updateTaskStatus(taskId: string, newStatus: TaskStatus) {
		try {
			const validStatusValues = ['NEW', 'IN_PROGRESS', 'PENDING', 'DONE'];
			if (!validStatusValues.includes(newStatus)) {
				throw new Error('Invalid task status');
			}
			await this.prisma.task.update({
				where: { id: taskId },
				data: { status: newStatus },
			});
			return 'Task Updated';
		} catch (error) {
			console.error(error);
			throw new Error('Failed to update task status');
		}
	}

	//Remove Task
	async deleteTask(taskId: string) {
		try {
			await this.prisma.task.delete({
				where: { id: taskId },
			});
			return { success: true, message: 'Task deleted successfully' };
		} catch (error) {
			throw new NotFoundException(`Task with ID ${taskId} not found`);
		}
	}
}
