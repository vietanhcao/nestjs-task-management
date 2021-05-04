import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.module';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}
