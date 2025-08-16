// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourierService {
//   private apiUrl = 'http://localhost:5000/api/couriers';
  
//   private httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     })
//   };

//   constructor(private http: HttpClient) { }

//   private handleError(error: any) {
//     console.error('An error occurred:', error);
//     return throwError(() => new Error(
//       error.error?.message || error.message || 'Server error'
//     ));
//   }

//   getCouriers(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl, this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }

//   addCourier(courier: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, courier, this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }

//   deleteCourier(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private apiUrl = environment.apiUrl;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(
      error.error?.message || error.message || 'Server error'
    ));
  }

  getCouriers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addCourier(courier: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, courier, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCourier(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
