import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes.ts';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    /// diffirent use validation
    return this.tasksService.getTasks(filterDto);
  }

  // // @Get()
  // // getAllTasks(): Task[] {
  // //   return this.tasksService.getAllTasks();
  // // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    // @Body('title') title: string,
    // @Body('description') description: string
    return this.tasksService.createTask(createTaskDto);
  }

  // // @Put()
  // // @HttpCode(200)
  // // updateTask(@Body() updateTaskDto: UpdateTaskDto): Task {
  // //   return this.tasksService.updateTask(updateTaskDto);
  // // }

  @Patch('/:id/status')
  @HttpCode(200)
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
