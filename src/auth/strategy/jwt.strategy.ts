import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		config: ConfigService,
		private prisma: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				JwtStrategy.extractJwt,
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			ignoreExpiration: true,
			secretOrKey: config.get('JWT_SECRET'),
		});
	}

	private static extractJwt(req: Request): string | null {
		if (req.cookies && 'access_token' in req.cookies && req.cookies.access_token.length > 0) {
			return req.cookies.access_token;
		}
	}

	async validate(payload: { sub: string; email: string }) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.sub,
			},
		});
		delete user.hash;
		return user;
	}
}
