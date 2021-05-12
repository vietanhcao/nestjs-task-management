import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
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
import { User } from 'src/auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    /// diffirent use validation
    this.logger.verbose(`User "${user.username}" retrieving all task. Filter ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto, user);
  }

  // // @Get()
  // // getAllTasks(): Task[] {
  // //   return this.tasksService.getAllTasks();
  // // }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<number> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    // @Body('title') title: string,
    // @Body('description') description: string
    this.logger.verbose(`User "${user.username}" retrieving all task. Create ${JSON.stringify(createTaskDto)}`) 
    return this.tasksService.createTask(createTaskDto, user);
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
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
