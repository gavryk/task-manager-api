import { Task } from '@prisma/client';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsOptional()
	password?: string;

	@IsString()
	@IsOptional()
	name: string;

	@IsArray()
	tasks: Task[];
}

export class UserUpdateDto {
	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	avatarPath?: string;

	@IsString()
	@IsOptional()
	name?: string;

	@IsOptional()
	@IsArray()
	tasks?: Task[];

	@IsString()
	@IsOptional()
	userId?: string;
}
