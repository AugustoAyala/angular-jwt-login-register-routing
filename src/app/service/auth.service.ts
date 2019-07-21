import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Jwt } from '../interface/jwt';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  SERVER: string = 'http://localhost:8000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  login(user: User): Observable<Jwt> {
    return this.httpClient.post<Jwt>(`${this.SERVER}/login`,
      user).pipe(tap(
        (res: Jwt) => {
          if (res) {
            this.saveToken(res.data.token, res.data.expiresIn);
          }
        })
      );
  }

  register(user: User): Observable<Jwt> {
    return this.httpClient.post<Jwt>(`${this.SERVER}/register`,
      user).pipe(tap(
        (res: Jwt) => {
          if (res) {
            this.saveToken(res.data.token, res.data.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EXPIRES");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("EXPIRES", expiresIn);
    this.token = token;
  }

}