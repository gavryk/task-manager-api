import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';

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
}
