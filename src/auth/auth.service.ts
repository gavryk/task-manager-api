import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return this.prisma.user.findMany();
  }

  signup() {
    return 'I Am Signup';
  }
}
