import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../decorators';
import { UserUpdateDto } from './dto';

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@UseGuards(JwtGuard)
	@Get()
	getAllUsers() {
		return this.userService.getAllUsers();
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
}
