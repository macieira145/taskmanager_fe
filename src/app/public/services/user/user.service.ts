import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  create(user: User) {
    return this.http.post('http://localhost:5294/api/Auth/register', user, { responseType: 'text' }).pipe(
      tap(response => this.snackbar.open(`Hello! Welcome to the TASK MANAGER!`, 'Close', {
        duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created, due to: ${e.error.message}`, 'Close', {
          duration: 4000, horizontalPosition: 'center', verticalPosition: 'top'
        })

        return throwError(e)
      })
    )
  }
}
