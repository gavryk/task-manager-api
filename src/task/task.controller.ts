import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Get()
	async getAllTasks() {
		return this.taskService.getAllTasks();
	}

	@Get('/:userId')
	async getUserTasks(@Param('userId') userId: string) {
		return this.taskService.getUserTask(userId);
	}
}
