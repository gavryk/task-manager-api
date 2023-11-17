import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthRegDto, refreshTokenDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('register')
	signup(@Body() dto: AuthRegDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	async signin(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const dataResponse = await this.authService.login(dto, res);
		return dataResponse;
	}

	@Post('login/access-token')
	async getNewToken(@Body() dto: refreshTokenDto, @Res({ passthrough: true }) res: Response) {
		const dataResponse = await this.authService.getNewToken(dto.refreshToken, res);
		return dataResponse;
	}

	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return await this.authService.logout(res);
	}
}
