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

export class AuthDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6, {
		message: 'Password must be at least 6 charcters long',
	})
	password: string;

	@IsString()
	name: string = 'John Doe';

	@IsString()
	@IsNotEmpty()
	role: Role;

	@IsString()
	@IsOptional()
	@Equals(process.env.ADMIN_KEY, { message: 'Invalid admin key' })
	@ValidateIf((object, value) => object.role === 'ADMIN')
	adminKey: string;
}
