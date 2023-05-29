import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor(private http : HttpClient, private snackbar: MatSnackBar) { } 

  create(task: Task) {
    return this.http.post('http://localhost:5294/api/Task/', task, { responseType: 'text' }).pipe(
      tap(response => {
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

  getTasks() : Observable<Task[]> {
    this.http.get<string>('http://localhost:5294/api/Task/').pipe(
      tap<string>((response) => {
        var json = JSON.parse(response)
        for(let i = 0; i < json.length; i++) {
          
        }
      })
    )
    return this.http.get<Task[]>('http://localhost:5294/api/Task/')
  }
}