import { Component, Input } from '@angular/core';
import { TicketResponse } from '../../../model/ticket';
import { TicketService } from '../../../service/ticket.service';
import { UserResponse } from '../../../model/user';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';
import { ProjectService } from '../../../service/project.service';
import { CommentService } from '../../../service/comment.service';
import { CommentRequest } from '../../../model/comment';

@Component({
  selector: 'app-ticket-user-management',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './ticket-user-management.component.html',
  styleUrl: './ticket-user-management.component.css'
})

export class TicketUserManagementComponent {
  @Input() ticket!: TicketResponse;
  request!: TicketResponse;

  faArrowDown = faChevronDown;
  faClose = faXmark;
  
  users: UserResponse[] = [];
  selectUser: boolean = false;

  constructor (private ticketService: TicketService, private projectService: ProjectService, private _ticket: ViewTicketComponent, private commentService: CommentService) {
    
  }

  ngOnInit() {
    this.projectService.getProjectByCode(this.ticket.projectCode).subscribe(data => {
      this.users = data.teamMembers;
    })

    this.request = {
      id: this.ticket.id,
      title: this.ticket.title,
      description: this.ticket.description,
      createdAt: this.ticket.createdAt,
      updatedAt: this.ticket.updatedAt,
      priority: this.ticket.priority,
      status: this.ticket.status,
      reportedBy: this.ticket.reportedBy,
      assignees: [...this.ticket.assignees],
      projectId: this.ticket.projectId,
      projectCode: this.ticket.projectCode,
      commentCount: this.ticket.commentCount
    }
  }

  addAssignee(user: UserResponse) {
    this.request.assignees.push(user);
  } 

  removeFromMember(user: UserResponse) {
    var indx = this.request.assignees.indexOf(user);
    this.request.assignees.splice(indx, 1);
  }

  isAssigned(user: UserResponse): boolean {
    for (var u of this.request.assignees) {
      if (u.name == user.name) {
        return true;
      }
    }

    return false;
  }

  checkIfNewAssign(name: string) {
    for (var user of this.ticket.assignees) {
      if (user.name == name) {
        return false;
      }
    }

    return true;
  }

  checkIfUnAssign(name: string) {
    for (var user of this.request.assignees) {
      if (user.name == name) {
        return false;
      }
    }

    return true;
  }


  onSubmit() {
    var activityLog: string[] = [];

    var assign: string[] = [];
    for (var assignees of this.request.assignees) {
      if (this.checkIfNewAssign(assignees.name)) {
        assign.push(assignees.name);
      }
    }

    var unassign: string[] = [];
    for (var assignees of this.ticket.assignees) {
      if (this.checkIfUnAssign(assignees.name)) {
        unassign.push(assignees.name);
      }
    }

    if (assign.length > 0) {
      var str = 'assign '
      for (var user of assign) {
        str += `@${user} `
      }
      activityLog.push(`%__edit_log__%${str}`)
    }

    if (unassign.length > 0) {
      var str = 'unassign '
      for (var user of unassign) {
        str += `@${user} `
      }
      activityLog.push(`%__edit_log__%${str}`)
    }

    this.ticketService.updateTicket(this.request).subscribe(data => {
      this._ticket.ticket = data;
      for (var log of activityLog) {
        var request: CommentRequest = {
          context: log,
          ticketId: this.ticket.id
        }

        this.commentService.addComment(request).subscribe(
          (data) => {
            this._ticket.comments.push(data);
            this.ticket.commentCount++;
          }
        );
      }
      this.cancel();
    });
  }

  cancel() {
    this._ticket.manageAssignee = false;
  }
}

