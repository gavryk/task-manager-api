import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from '../decorators';
import { UserDto } from './dto';

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
	async updateUser(@GetUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateUser(id, dto);
	}
}
