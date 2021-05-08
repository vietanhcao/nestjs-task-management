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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes.ts';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}


  // @Get()
  // getTask(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] { /// diffirent use validation
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();    
  // }

  // // @Get()
  // // getAllTasks(): Task[] {
  // //   return this.tasksService.getAllTasks();
  // // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): string {
  //   return this.tasksService.deleteTaskById(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // @HttpCode(201)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   // @Body('title') title: string,
  //   // @Body('description') description: string
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // // @Put()
  // // @HttpCode(200)
  // // updateTask(@Body() updateTaskDto: UpdateTaskDto): Task {
  // //   return this.tasksService.updateTask(updateTaskDto);
  // // }

  // @Patch('/:id/status')
  // @HttpCode(200)
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
