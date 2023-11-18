import { TaskStatus } from '@prisma/client';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsNotEmpty()
	@IsEnum(TaskStatus)
	status: TaskStatus;

	@IsMongoId()
	@IsNotEmpty()
	userId: string;
}

export class UpdateTaskDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@IsOptional()
	@IsMongoId()
	@IsNotEmpty()
	userId?: string;
}
