import { Injectable } from '@angular/core';
import { Constant } from '../app-constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentRequest, CommentResponse } from '../model/comment';

const url = `${Constant.API_ENDPOINT}/comment`;

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(private httpClient: HttpClient) { }

  addComment(request: CommentRequest): Observable<CommentResponse> {
    return this.httpClient.post<CommentResponse>(`${url}`, request);
  }

  getCommentByTicket(id: number): Observable<CommentResponse[]> {
    return this.httpClient.get<CommentResponse[]>(`${url}/by-ticket/${id}`);
  }
}
