import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@Post('signin')
	async signin(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const tokenResponse = await this.authService.signin(dto, res);
		return tokenResponse;
	}
}
