import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  login(user: User): Observable<string> {
    return this.http.post('http://localhost:5294/api/Auth/login', user, {responseType: 'text'}).pipe(
      tap((res) => {
        localStorage.setItem("access_token", JSON.parse(res).data.access_token)
      }),
      tap(() => 
      this.snackbar.open(`Welcome back!`, 'Close', {
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
