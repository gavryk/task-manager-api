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
	tasks: string[];
}
