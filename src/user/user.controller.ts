import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../decorators';
import { UserDto } from './dto';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get('profile')
	getMe(@GetUser('id') id: string) {
		return this.userService.getById(id);
	}

	@UseGuards(JwtGuard)
	@Put('profile')
	async updateUser(@GetUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateUser(id, dto);
	}

	@UseGuards(JwtGuard)
	@Patch('profile/tasks/:taskId')
	async toggleTask(@Param('taskId') taskId: string, @GetUser('id') id: string) {
		return this.userService.toggleTask(id, taskId);
	}
}
