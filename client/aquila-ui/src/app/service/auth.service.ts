import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../app-constant';
import { AuthResponse, LoginRequest, SignupRequest } from '../model/auth';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

const url = `${Constant.API_ENDPOINT}/auth`;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  createUser(request: SignupRequest): Observable<void> {
    return this.httpClient.post<void>(`${url}/signup`, request, {headers:{skip: 'true'}});
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${url}/login`, request, {headers:{skip: 'true'}}).pipe(map(data => {
      this.localStorage.store('username', data.username);
      this.localStorage.store('authToken', data.authToken);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('createdAt', data.createdAt);
      this.localStorage.store('expireAt', data.expireAt);
      this.localStorage.store('role', data.role);

      return data;
    }));
  }

  refreshToken() {
    const request = {
      username: this.getUsername(),
      refreshToken: this.getRefreshToken()
    };

    return this.httpClient.post<AuthResponse>(`${url}/referesh-token`, request).pipe(tap(data => {
      this.localStorage.store('authToken', data.authToken);
      this.localStorage.store('createdAt', data.createdAt);
      this.localStorage.store('expireAt', data.expireAt);
    }));
  }

  logout() {
    const token: string = this.getRefreshToken();
    this.httpClient.delete<void>(`${url}/logout/${token}`).subscribe(
      (res) => {
        this.localStorage.clear('username');
      this.localStorage.clear('authToken');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('createdAt');
      this.localStorage.clear('expireAt');
      this.localStorage.clear('role');
      }
    );
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername(): string {
    return this.localStorage.retrieve('username');
  }

  getAuthToken(): string {
    return this.localStorage.retrieve('authToken');
  }

  getRole(): string {
    return this.localStorage.retrieve('role');
  }

  isLoggin(): boolean {
    return (this.getAuthToken() != null && this.getRefreshToken() != null)
  }
}
