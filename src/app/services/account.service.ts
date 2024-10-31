// src/app/services/account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrlGet = 'https://reqres.in/api/users?page=2'; // URL para o GET
  private apiUrlPut = 'https://reqres.in/api/users'; // URL base para o PUT

  constructor(private http: HttpClient) {}

  // Método para obter as informações da conta (GET)
  getAccountInfo(): Observable<any> {
    return this.http.get(this.apiUrlGet).pipe(
      catchError(this.handleError)
    );
  }

  // Método para atualizar as informações da conta (PUT)
  updateAccountInfo(userId: string, userInfo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.apiUrlPut}/${userId}`, userInfo, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para lidar com erros
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
