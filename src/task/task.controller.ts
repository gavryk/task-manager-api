import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';
import { TaskStatus } from '@prisma/client';

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UseGuards(JwtGuard)
	@Get()
	async getAllTasks() {
		return this.taskService.getAllTasks();
	}
	@UseGuards(JwtGuard)
	@Get('/:userId')
	async getUserTasks(@Param('userId') userId: string) {
		return this.taskService.getUserTasks(userId);
	}

	@UseGuards(JwtGuard)
	@Put(':taskId/status')
	async updateTaskStatus(@Param('taskId') taskId: string, @Body('status') newStatus: TaskStatus) {
		return this.taskService.updateTaskStatus(taskId, newStatus);
	}
}
