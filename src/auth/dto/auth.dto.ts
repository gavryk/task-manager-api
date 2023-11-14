import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
}
