import { Component } from '@angular/core';
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from '../dashboard.component';
import { TicketService } from '../../../service/ticket.service';
import { TicketResponse } from '../../../model/ticket';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  faMenu = faBars;
  faStatus = faCircleDot;
  faPriority = faCircle;

  filter: string = 'ALL';

  tickets: TicketResponse[] = [];

  constructor (private dashboard:DashboardComponent, private ticketService: TicketService, private router: Router) {
    this.ticketService.getTicketByUser().subscribe(
      (res) => {
        this.tickets = res;
        console.log(res);
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }

  toggleNavbar() {
    this.dashboard.navbar = true;
  }

  viewTicket(ticket: TicketResponse) {
    this.router.navigate(['ticket'], {queryParams: {id: ticket.id}});
  }
}
