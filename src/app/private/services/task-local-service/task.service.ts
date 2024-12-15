import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/interfaces/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TaskLocalService {
  tasks = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  createTask(task: Task): Task {
    task.id = uuidv4();
    const updatedTasks = [...this.tasks.value, task];
    this.tasks.next(updatedTasks);
    return task;
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable();
  }

  deleteTask(task: Task): Task {
    const updatedTasks = this.tasks.value.filter((v) => v.id !== task.id);
    this.tasks.next(updatedTasks);
    return task;
  }

  updateTask(task: Task): Task {
    let updatedTasks = this.tasks.value;
    updatedTasks[updatedTasks.findIndex((t) => t.id === task.id)] = task;
    this.tasks.next(updatedTasks);
    return task;
  }
}
