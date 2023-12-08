import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../decorators';
import { UpdatePasswordDto, UserUpdateDto } from './dto';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get()
	getAllUsers() {
		return this.userService.getAllUsers();
	}

	@UseGuards(JwtGuard)
	@Get('profile/me')
	getMe(@GetUser('id') id: string) {
		return this.userService.getUserById(id);
	}

	@UseGuards(JwtGuard)
	@Get('profile/:userId')
	getUser(@Param('userId') userId: string) {
		return this.userService.getUserById(userId);
	}

	@UseGuards(JwtGuard)
	@Put('profile')
	async updateUser(@GetUser('id') id: string, @Body() dto: UserUpdateDto) {
		return this.userService.updateUser(id, dto);
	}

	@UseGuards(JwtGuard)
	@Patch('profile/:userId/tasks')
	updateUserTasks(@Param('userId') userId: string, @Body() dto: UserUpdateDto) {
		return this.userService.updateUserTasks(userId, dto);
	}

	@UseGuards(JwtGuard)
	@Patch('profile/:userId/password')
	updateUserPass(@Param('userId') userId: string, @Body() dto: UpdatePasswordDto) {
		return this.userService.updateUserPass(userId, dto);
	}
}
