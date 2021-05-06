import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  deleteTaskById(id: string): string {
    const found = this.getTaskById(id); // reuser getTaskById
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    return id;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  // updateTask(updateTaskDto: UpdateTaskDto): Task {
  //   const { id, title, description, status } = updateTaskDto;
  //   const task: UpdateTaskDto = {
  //     id,
  //     title,
  //     description,
  //     status,
  //   };

  //   const taskUpdate = this.tasks.find((task) => task.id === id);

  //   taskUpdate.id = id;

  //   const taskMissingId = this.tasks.filter((task) => task.id !== id);
  //   taskMissingId.push(task);
  //   this.tasks = taskMissingId;

  //   return task;
  // }
}
