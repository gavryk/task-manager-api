import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	//Get All Users
	async getAllUsers() {
		const users = await this.prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				avatarPath: true,
				tasks: { select: { id: true, title: true, description: true, status: true, userId: true } },
			},
		});
		return users;
	}
	//Get User By Id
	async getUserById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				email: true,
				name: true,
				avatarPath: true,
				tasks: { select: { id: true, title: true, description: true, status: true, userId: true } },
			},
		});
		return user;
	}
	//Update User
	async updateUser(id: string, dto: UserUpdateDto) {
		try {
			const updatedUser = await this.prisma.user.update({
				where: { id },
				data: {
					name: dto.name,
					email: dto.email,
					avatarPath: dto.avatarPath,
				},
				select: {
					id: true,
					email: true,
					name: true,
					avatarPath: true,
					tasks: {
						select: { id: true, title: true, description: true, status: true, userId: true },
					},
				},
			});
			if (!updatedUser) {
				throw new NotFoundException(`User with ID ${id} not found`);
			}
			return updatedUser;
		} catch (error) {
			throw new Error(`Unable to update task: ${error.message}`);
		}
	}

	async updateUserTasks(userId: string, dto: UserUpdateDto) {
		try {
			await this.prisma.task.deleteMany({
				where: { userId },
			});
			await this.prisma.task.createMany({
				data: [...dto.tasks],
			});

			const user = this.prisma.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					email: true,
					name: true,
					avatarPath: true,
					tasks: {
						select: { id: true, title: true, description: true, status: true, userId: true },
					},
				},
			});

			return user;
		} catch (error) {
			throw new Error(`Unable to update task: ${error.message}`);
		}
	}
}
