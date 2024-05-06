import { Component, Input, OnInit } from '@angular/core';
import { TicketResponse } from '../../../model/ticket';
import { TicketService } from '../../../service/ticket.service';
import { UserService } from '../../../service/user.service';
import { UserResponse } from '../../../model/user';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-ticket-user-management',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './ticket-user-management.component.html',
  styleUrl: './ticket-user-management.component.css'
})

export class TicketUserManagementComponent {
  @Input() ticket!: TicketResponse;

  faArrowDown = faChevronDown;
  
  users: UserResponse[] = [];
  selectUser: boolean = false;

  constructor (private ticketService: TicketService, private projectService: ProjectService, private _ticket: ViewTicketComponent) {
    
  }

  ngOnInit() {
    console.log(this.ticket);
    this.projectService.getProjectByCode(this.ticket.projectCode).subscribe(data => {
      this.users = data.teamMembers;
    })
  }

  addAssignee(user: UserResponse) {
    this.ticket.assignees.push(user);
  } 

  isAssigned(user: UserResponse): boolean {
    for (var u of this.ticket.assignees) {
      if (u.name == user.name) {
        return true;
      }
    }

    return false;
  }


  onSubmit() {
    this.ticketService.updateTicket(this.ticket).subscribe(data => {
      this._ticket.ticket = data;
      this.cancel();
    });
  }

  cancel() {
    this._ticket.manageAssignee = false;
  }
}
