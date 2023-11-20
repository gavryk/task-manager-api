import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtGuard } from 'src/auth/guard';
import { TaskStatus } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}
	//Get All Tasks
	@UseGuards(JwtGuard)
	@Get()
	async getAllTasks() {
		return this.taskService.getAllTasks();
	}
	//Get Tasks By Status
	@UseGuards(JwtGuard)
	@Get('/filter')
	async getTasksByStatus(@Query('status') status: TaskStatus) {
		return this.taskService.getTasksByStatus(status);
	}
	//Get User Tasks
	@UseGuards(JwtGuard)
	@Get('/:userId')
	async getUserTasks(@Param('userId') userId: string) {
		return this.taskService.getUserTasks(userId);
	}
	// Create New Task
	@UseGuards(JwtGuard)
	@Post()
	async createTask(@Body() dto: CreateTaskDto) {
		return this.taskService.createTask(dto);
	}
	//Update Task Status
	@UseGuards(JwtGuard)
	@Patch('/:taskId/status')
	async updateTaskStatus(@Param('taskId') taskId: string, @Body('status') newStatus: TaskStatus) {
		return this.taskService.updateTaskStatus(taskId, newStatus);
	}
	//Update Task
	@UseGuards(JwtGuard)
	@Put('/:taskId')
	async updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
		return this.taskService.updateTask(taskId, dto);
	}
	//Remove Task
	@UseGuards(JwtGuard)
	@Delete('/:taskId')
	async deleteTask(@Param('taskId') taskId: string): Promise<any> {
		return this.taskService.deleteTask(taskId);
	}
}
