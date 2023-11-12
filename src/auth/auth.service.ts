import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService,
	) {}

	async signup(dto: AuthDto) {
		//generate the password hash
		const hash = await argon.hash(dto.password);
		//save the new user in the db
		try {
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					name: dto.name,
					hash,
				},
			});
			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}
			throw error;
		}
	}

	async signin(dto: AuthDto, res: Response) {
		try {
			//Find the user by email
			const user = await this.prisma.user.findUnique({
				where: {
					email: dto.email,
				},
			});
			//if user does not exist throw exception
			if (!user) throw new ForbiddenException('Credential incorrect');
			//compare password
			const pwMatches = await argon.verify(user.hash, dto.password);
			//if password incorrect throw exception
			if (!pwMatches) throw new ForbiddenException('Credential incorrect');
			//send back the user
			// delete user.hash;
			const tokenResponse = await this.signToken(user.id, user.email);
			if (!tokenResponse)
				throw new BadRequestException(`Cannot Get User Name: ${dto.name}, Email: ${dto.email}`);
			// Set cookie with Token
			res.cookie('access_token', tokenResponse.access_token, {
				httpOnly: true,
				secure: this.config.get('NODE_ENV', 'development') === 'production',
				maxAge: 30 * 24 * 60 * 60 * 1000, //30d
				sameSite: 'lax',
			});
			//Сut the hash from the user data
			const { hash, ...userData } = user;
			return { ...userData };
		} catch (error) {
			console.error('Error in signin function:', error);
			throw error;
		}
	}

	async signToken(userId: string, email: string): Promise<{ access_token: string }> {
		const payload = {
			sub: userId,
			email,
		};
		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(payload, {
			expiresIn: '30d',
			secret: secret,
		});

		return {
			access_token: token,
		};
	}
}
