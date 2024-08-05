import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  title: string;
  description: string;
}

export class filterTaskDto {
  status: TaskStatus;
  search: string;
}
