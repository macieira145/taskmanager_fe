import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/interfaces/task.interface';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  createTask(task: Task): Observable<Response> {
    return this.http.post<Response>('http://localhost:5294/api/Task/', task, { responseType: 'json' })
      .pipe(
        tap((response) => {
          this.snackbar.open(`Task created successfully!`, 'Close', {
            duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
          })
        }),
        catchError(e => {
          this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
            duration: 4000, horizontalPosition: 'center', verticalPosition: 'top'
          })

          return throwError(e)
        })
      )
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:5294/api/Task/')
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`http://localhost:5294/api/Task/${task.id}`).pipe(
      tap((response) => {
        this.snackbar.open(`Task deleted successfully!`, 'Close', {
          duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
        })
      }),
      catchError(e => {
        this.snackbar.open(`Error deleting task, due to: ${e.error.message}`, 'Close', {
          duration: 4000, horizontalPosition: 'center', verticalPosition: 'top'
        })

        return throwError(e)
      })
    )
  }

  updateTask(task: Task): Observable<Response> {
    return this.http.put<Response>(`http://localhost:5294/api/Task/${task.id}`, task, { responseType: 'json' })
      .pipe(
        tap((response) => {
          this.snackbar.open(`Task updated successfully!`, 'Close', {
            duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
          })
        }),
        catchError(e => {
          this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
            duration: 4000, horizontalPosition: 'center', verticalPosition: 'top'
          })

          return throwError(e)
        })
      )
  }
}