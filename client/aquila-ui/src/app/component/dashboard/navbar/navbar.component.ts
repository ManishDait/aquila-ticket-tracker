import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBarsProgress, faChevronLeft, faHome, faTicketSimple, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { DashboardComponent } from '../dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  faHome = faHome;
  faProject = faBarsProgress;
  faTicket = faTicketSimple;
  faManage = faUserTie;
  faBack = faChevronLeft;

  constructor (private dashboard: DashboardComponent) {}

  closeNavbar() {
    this.dashboard.navbar = false;
  }

  getUsername(): string {
    return this.dashboard.username;
  }

  getColor(): string {
    let hash = 0;
    for (var i = 0; i < this.getUsername().length; i++) {
      hash += this.getUsername().charCodeAt(i);
    }

    const hue = hash % 360;
    const saturation = 50;
    const lightness = 80;
    
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  getPage(): string {
    return this.dashboard.tab;
  }
  
  setPage(page: string) {
    this.dashboard.tab = page;
  }
}
