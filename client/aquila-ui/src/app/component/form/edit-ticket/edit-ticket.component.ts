import { Component, Input } from '@angular/core';
import { TicketResponse } from '../../../model/ticket';
import { FormsModule } from '@angular/forms';
import { Constant } from '../../../app-constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../service/ticket.service';
import { ViewTicketComponent } from '../../view-ticket/view-ticket.component';

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

  constructor (private ticketService: TicketService, private _ticket: ViewTicketComponent) {
    
  }

  ngOnInit() {
    this.request = this.ticket;
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
    this.ticketService.updateTicket(this.request).subscribe(
      (res) => {
        this._ticket.ticket = res;
        this.cancel()
      }
    );
  }

  cancel() {
    this._ticket.editTicket = false;
  }
}
