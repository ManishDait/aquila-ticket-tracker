import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HomeComponent, ProjectComponent, NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private _navbar: boolean = true;
  private _username: string;

  private _tab = 'home';

  constructor (private authService: AuthService, private router: Router) {
    this._username = this.authService.getUsername()
  }

  get username(): string {
    return this._username;
  }

  get role(): string {
    return this.authService.getRole();
  }

  get isNavbar(): boolean {
    return this._navbar;
  }

  set navbar(toggle: boolean) {
    this._navbar = toggle;
  }

  get tab(): string {
    return this._tab;
  }

  set tab(page: string) {
    this._tab = page;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
