import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketRequest } from '../../../model/ticket';
import { ViewProjectComponent } from '../../view-project/view-project.component';
import { TicketService } from '../../../service/ticket.service';
import { UserResponse } from '../../../model/user';
import { Constant } from '../../../app-constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})

export class CreateTicketComponent {
  ticketForm: FormGroup;
  request: TicketRequest = {
    title: '',
    description: '',
    priority: '',
    assignees: [],
    projectId: 0
  }

  faArrowDown = faChevronDown;
  faClose = faXmark;

  selectUser: boolean = false;
  selectPriority: boolean = false;

  constructor(private project: ViewProjectComponent, private ticketService: TicketService) {
    this.ticketForm = new FormGroup({
      'title': new FormControl(),
      'description': new FormControl()
    });
  }

  getTeamMembers(): UserResponse[] {
    return this.project.teamMembers;
  }

  getPriorities(): string[] {
    return Constant.PRIORITIES;
  }

  addToMember(user: string) {
    this.request.assignees.push(user);
  }

  removeFromMember(user: string) {
    var indx = this.request.assignees.indexOf(user);
    this.request.assignees.splice(indx, 1);
  }

  setPriority(priority: string) {
    this.request.priority = priority;
    this.selectPriority = false;
  }

  onSubmit() {
    this.request.title = this.ticketForm.get('title')!.value;
    this.request.description = this.ticketForm.get('description')!.value;
    this.request.projectId = this.project.project.id;

    this.ticketService.createTicket(this.request).subscribe(
      (res) => {
        this.project.tickets.push(res);
        this.project.project.ticketCount++;
        this.cancel()
      }
    );
  }

  cancel() {
    this.project.createTicket = false;
  }
}
