import { Injectable, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto, filterTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(filterdto: filterTaskDto): Task[] {
    const { status, search } = filterdto;
    let tasks: Task[] = [];
    if (status) {
      tasks = this.tasks.filter((tasks) => tasks.status === status);
    }
    if (search) {
      tasks = this.tasks.filter((tasks) => tasks.title.includes(search));
    }
    return tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }
  updateTask(id: string, status: TaskStatus) {
    const index = this.tasks.findIndex((task) => task.id === id);
    const task = this.tasks[index];
    task.status = status;
    this.tasks[index] = task;
    return task;
  }
}
