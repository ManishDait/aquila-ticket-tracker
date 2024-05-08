import { Component, Input } from '@angular/core';
import { TicketResponse } from '../../../model/ticket';
import { FormsModule } from '@angular/forms';
import { Constant } from '../../../app-constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../service/ticket.service';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';
import { CommentService } from '../../../service/comment.service';
import { CommentRequest } from '../../../model/comment';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.css'
})

export class EditTicketComponent {
  @Input() ticket!: TicketResponse;
  request!: TicketResponse;

  faArrowDown = faChevronDown;

  selectPriority: boolean = false;
  selectStatus: boolean = false;

  constructor (private ticketService: TicketService, private _ticket: ViewTicketComponent, private commentService: CommentService) {
    
  }

  ngOnInit() {
    this.request = {
      id: this.ticket.id,
      title: this.ticket.title,
      description: this.ticket.description,
      createdAt: this.ticket.createdAt,
      updatedAt: this.ticket.updatedAt,
      priority: this.ticket.priority,
      status: this.ticket.status,
      reportedBy: this.ticket.reportedBy,
      assignees: this.ticket.assignees,
      projectId: this.ticket.projectId,
      projectCode: this.ticket.projectCode,
      commentCount: this.ticket.commentCount
    }
  }

  getPriorities(): string[] {
    return Constant.PRIORITIES;
  }

  getStatus(): string[] {
    return Constant.STATUS;
  }

  setPriority(priority: string) {
    this.request.priority = priority;
    this.selectPriority = false;
  }

  setStatus(status: string) {
    this.request.status = status;
    this.selectStatus = false;
  }

  onSubmit() {
    var activityLog: string[] = [];

    if (this.ticket.status != this.request.status) {
      activityLog.push(`%__edit_log__%change status from ${this.ticket.status} to ${this.request.status}`)
    }

    if (this.ticket.priority != this.request.priority) {
      activityLog.push(`%__edit_log__%change priority from ${this.ticket.priority} to ${this.request.priority}`)
    }

    if (this.ticket.title != this.request.title) {
      activityLog.push(`%__edit_log__%change title from \`${this.ticket.title}\` to \`${this.request.title}\``)
    }

    this.ticketService.updateTicket(this.request).subscribe(
      (res) => {
        this._ticket.ticket = res;
        for (var log of activityLog) {
          var request: CommentRequest = {
            context: log,
            ticketId: this.ticket.id
          }

          this.commentService.addComment(request).subscribe(
            (data) => {
              this.ticket.commentCount ++;
              this._ticket.comments.push(data);
            }
          );
        }
        this.cancel()
      }
    );
  }

  cancel() {
    this._ticket.editTicket = false;
  }
}
