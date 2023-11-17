import { Role } from '@prisma/client';
import {
	Equals,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
	ValidateIf,
} from 'class-validator';

class BaseAuthDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long',
	})
	password: string;

	@IsString()
	name: string = 'John Doe';
}

export class AuthDto extends BaseAuthDto {}

export class AuthRegDto extends BaseAuthDto {
	@IsString()
	@IsNotEmpty()
	role: Role;

	@IsString()
	@IsOptional()
	@Equals(process.env.ADMIN_KEY, { message: 'Invalid admin key' })
	@ValidateIf((object, value) => object.role === 'ADMIN')
	adminKey: string;
}
