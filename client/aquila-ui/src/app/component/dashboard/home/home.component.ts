import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from '../../dashboard/navbar/navbar.component';
import { faBars, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { DashboardComponent } from '../dashboard.component';
import { TicketService } from '../../../service/ticket.service';
import { TicketResponse } from '../../../model/ticket';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatDateTime } from '../../../helper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FontAwesomeModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  faMenu = faBars;
  faStatus = faCircleDot;
  faPriority = faCircle;

  tickets: TicketResponse[] = [];
  assignTicket: TicketResponse[] = [];
  completedTickets: TicketResponse[] = [];

  constructor (private dashboard:DashboardComponent, private ticketService: TicketService, private router: Router) {
    this.ticketService.getTicketByUser().subscribe(
      (res) => {
        this.tickets = res;
        this.ticketService.getTicketByAssignee().subscribe(
          (res) => {
            this.assignTicket = res;
            res.map(u => {
              if(u.status == 'CLOSED' || u.status == 'RESOLVE') {
                this.completedTickets.push(u);
              }
            })
          }
        );
        console.log(this.tickets);
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }

  formatDate(date: Date | null): string {
    if (date != null) {
      return formatDateTime(date.toString());
    }

    return '';
  }

  toggleNavbar() {
    this.dashboard.navbar = true;
  }

  viewTicket(ticket: TicketResponse) {
    this.router.navigate(['ticket'], {queryParams: {id: ticket.id}});
  }
}
