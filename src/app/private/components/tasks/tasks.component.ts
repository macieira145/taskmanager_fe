import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { TaskApiService } from '../../services/task-api-service/task.service';
import { v4 as uuidv4 } from 'uuid';
import { TaskLocalService } from '../../services/task-local-service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  action: string = 'create';
  task: Task = { id: uuidv4(), title: '', description: '', completed: false };

  constructor(private taskService: TaskLocalService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  editTask(task: Task) {
    this.action = 'update';
    this.task = task;
  }

  completeTask(task: Task) {
    task.completed = !task.completed;
    console.log(task);
    this._updateTask(task);
  }

  updateTask(task: Task) {
    this._updateTask(task);

    this.action = 'create';
  }

  addTask(task: Task) {
    this.taskService.createTask({
      title: task.title,
      description: task.description,
      completed: false,
    });
  }

  _updateTask(task: Task) {
    this.taskService.updateTask({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed === null ? false : task.completed,
    });
  }
}
