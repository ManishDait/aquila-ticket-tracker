import { Injectable } from '@angular/core';
import { Constant } from '../app-constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from '../model/user';

const url = `${Constant.API_ENDPOINT}/user`;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(`${url}`);
  }

  updateUser(request: UserRequest): Observable<UserResponse> {
    return this.httpClient.put<UserResponse>(`${url}`, request);
  }
}
