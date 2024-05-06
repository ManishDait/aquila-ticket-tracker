import { Injectable } from '@angular/core';
import { Constant } from '../app-constant';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TicketRequest, TicketResponse } from '../model/ticket';

const url = `${Constant.API_ENDPOINT}/ticket`

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  
  createTicket(request: TicketRequest): Observable<TicketResponse> {
    return this.httpClient.post<TicketResponse>(`${url}`, request);
  }

  getTicketByUser(): Observable<TicketResponse[]> {
    var username: string = this.authService.getUsername();
    return this.httpClient.get<TicketResponse[]>(`${url}/by-user/${username}`)
  }

  getTicketByAssignee(): Observable<TicketResponse[]> {
    var username: string = this.authService.getUsername();
    return this.httpClient.get<TicketResponse[]>(`${url}/by-assignee/${username}`)
  }

  getTicketById(id: number): Observable<TicketResponse> {
    return this.httpClient.get<TicketResponse>(`${url}/${id}`)
  }

  getTicketByProject(code: string): Observable<TicketResponse[]> {
    return this.httpClient.get<TicketResponse[]>(`${url}/by-project-code/${code}`)
  }

  updateTicket(request: TicketResponse): Observable<TicketResponse> {
    return this.httpClient.put<TicketResponse>(`${url}`, request);
  }
}
