import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { TicketResponse } from '../../model/ticket';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../service/ticket.service';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../service/comment.service';
import { CommentRequest, CommentResponse } from '../../model/comment';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { EditTicketComponent } from '../form/edit-ticket/edit-ticket.component';
import { TicketUserManagementComponent } from '../form/ticket-user-management/ticket-user-management.component';
import { formatDateTime } from '../../helper';

@Component({
  selector: 'app-view-ticket',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, EditTicketComponent, TicketUserManagementComponent],
  templateUrl: './view-ticket.component.html',
  styleUrl: './view-ticket.component.css'
})
export class ViewTicketComponent {
  faStatus = faCircleDot;
  faEdit = faPen;
  
  private _ticket: TicketResponse = {
    id: 0,
    title: '',
    description: '',
    createdAt: null,
    updatedAt: null,
    priority: '',
    status: '',
    reportedBy: null,
    assignees: [],
    projectId: 0,
    projectCode: '',
    commentCount: 0
  };

  private _editTicket: boolean = false;
  private _manageAssignee: boolean = false;

  comments: CommentResponse[] = [];

  constructor (private activeRoute: ActivatedRoute, private ticketService: TicketService, private commentService: CommentService) {
    this.activeRoute.queryParams.subscribe(
      (params) => {
        if (params['id'] != undefined && params['id'] != null) {
          this.ticketService.getTicketById(params['id']).subscribe(
            (res) => {
              this._ticket = res;
              this.commentService.getCommentByTicket(res.id).subscribe(
                (res) => {
                  this.comments = res;
                }
              );
            }
          );
        }
      }
    );
  }

  get ticket(): TicketResponse {
    return this._ticket;
  }

  set ticket(ticket: TicketResponse) {
    this._ticket = ticket;
  }

  get editTicket(): boolean {
    return this._editTicket;
  }

  set editTicket(toggle: boolean) {
    this._editTicket = toggle;
  }

  get manageAssignee(): boolean {
    return this._manageAssignee;
  }

  set manageAssignee(toggle: boolean) {
    this._manageAssignee = toggle;
  }

  getColor(username: string): string {
    let hash = 0;
    for (var i = 0; i <  username.length; i++) {
      hash += username.charCodeAt(i);
    }

    const hue = hash % 360;
    const saturation = 50;
    const lightness = 80;
    console.log(`hsl(${hue}, ${saturation}, ${lightness})`);
    
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  formatDate(date: Date | null): string {
    if (date != null) {
      return formatDateTime(date.toString());
    }

    return '';
  }


  addComment(context: string) {
    var request: CommentRequest = {
      context: context,
      ticketId: this._ticket.id
    }

    this.commentService.addComment(request).subscribe(
      (res) => {
        this.comments.push(res);
        this.ticket.commentCount++;
      }
    );
  }
}
