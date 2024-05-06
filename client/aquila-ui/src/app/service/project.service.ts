import { Injectable } from '@angular/core';
import { Constant } from '../app-constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRequest, ProjectResponse } from '../model/project';
import { AuthService } from './auth.service';

const url = `${Constant.API_ENDPOINT}/project`

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  createProject(request: ProjectRequest): Observable<ProjectResponse> {
    return this.httpClient.post<ProjectResponse>(`${url}`, request);
  }

  getProjectsByUser(): Observable<ProjectResponse[]> {
    var username: string = this.authService.getUsername();
    return this.httpClient.get<ProjectResponse[]>(`${url}/by-user/${username}`);
  }

  getProjectByCode(code: string): Observable<ProjectResponse> {
    return this.httpClient.get<ProjectResponse>(`${url}/by-code/${code}`);
  }

  updateProject(request: ProjectResponse): Observable<ProjectResponse> {
    console.log('Sending: ', request);
    
    return this.httpClient.put<ProjectResponse>(`${url}`, request);
  }
}
