import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url : string = "https://localhost:7168/api/"

  constructor(private http: HttpClient) { }

  get(urlAppend: string) {
    return this.http.get(
      this.url.concat(urlAppend),
      {
        headers: {
          "Authorization" : String(localStorage.getItem("logInToken"))
        }
      }
    )
  }
}
