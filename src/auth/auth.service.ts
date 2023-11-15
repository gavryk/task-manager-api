import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	//Register Function
	async register(dto: AuthDto) {
		const { email, password } = dto;
		//check if user exist
		const oldUser = await this.prisma.user.findUnique({ where: { email } });
		if (oldUser) throw new BadRequestException('User already exist');
		//save the new user in the db
		try {
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					name: dto.name,
					hash: await argon.hash(password),
				},
			});
			const tokens = await this.signToken(user.id, user.email);
			return {
				user: this.returnUserFields(user),
				...tokens,
			};
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}
			throw error;
		}
	}
	//Login Function
	async login(dto: AuthDto, res: Response) {
		try {
			const user = await this.validateUser(dto);
			//get tokens
			const tokenResponse = await this.signToken(user.id, user.email);
			if (!tokenResponse) throw new BadRequestException(`Cannot Get User`);
			// Set cookie with Token
			this.setCookies(tokenResponse, res);
			//Сut the hash from the user data
			return {
				user: this.returnUserFields(user),
				...tokenResponse,
			};
		} catch (error) {
			console.error('Error in signin function:', error);
			throw error;
		}
	}

	//--------------------Additional Methods--------------------
	//RefreshToken Function
	async getNewToken(refreshToken: string, res: Response) {
		const result = await this.jwt.verifyAsync(refreshToken);
		if (!result) throw new UnauthorizedException('Invalid refresh token');
		const user = await this.prisma.user.findUnique({ where: { email: result.email } });
		const tokens = await this.signToken(user.id, user.email);
		this.setCookies(tokens, res);
		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}
	//Generate Token
	private async signToken(
		userId: string,
		email: string,
	): Promise<{ access_token: string; refresh_token: string }> {
		const payload = { sub: userId, email };
		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '1h',
			secret: secret,
		});

		const refreshToken = await this.jwt.signAsync(payload, {
			expiresIn: '15d',
			secret: secret,
		});

		return {
			access_token: token,
			refresh_token: refreshToken,
		};
	}
	//Return User Fields
	private returnUserFields(user: User) {
		const { hash, ...userData } = user;
		return { ...userData };
	}

	//Validate User Function
	private async validateUser(dto: AuthDto) {
		const { email, password } = dto;
		//Find the user by email
		const user = await this.prisma.user.findUnique({ where: { email: email } });
		//if user does not exist throw exception
		if (!user) throw new NotFoundException('Credential incorrect');
		//compare password
		const pwMatches = await argon.verify(user.hash, password);
		//if password incorrect throw exception
		if (!pwMatches) throw new UnauthorizedException('Credential incorrect');
		//return result
		return user;
	}

	//Set Tokens in Cookies
	private setCookies(tokens: { access_token: string; refresh_token: string }, res: Response) {
		res.cookie('access_token', tokens.access_token, {
			httpOnly: true,
			secure: this.config.get('NODE_ENV', 'development') === 'production',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
			sameSite: 'lax',
		});

		res.cookie('refresh_token', tokens.refresh_token, {
			httpOnly: true,
			secure: this.config.get('NODE_ENV', 'development') === 'production',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
			sameSite: 'lax',
		});
	}
}
