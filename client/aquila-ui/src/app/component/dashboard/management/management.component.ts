import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faPen } from '@fortawesome/free-solid-svg-icons';
import { UserResponse } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { CreateUserComponent } from '../../form/create-user/create-user.component';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from '../../form/edit-user/edit-user.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [FontAwesomeModule, CreateUserComponent, EditUserComponent, CommonModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  faMenu = faBars;
  faEdit = faPen;

  users: UserResponse[] = [];
  private _manageUser: boolean = false;
  private _editUser: boolean = false;

  selectedUser: UserResponse = {
    name: '',
    email: '',
    role: '',
    enabled: false
  }

  constructor (private dashboard:DashboardComponent, private userService: UserService) {
    this.getUsers();
  }

  get manageUser(): boolean {
    return this._manageUser;
  }

  set manageUser(toggle: boolean) {
    this._manageUser = toggle;
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }

  get editUser(): boolean {
    return this._editUser;
  }

  set editUser(toggle: boolean) {
    this._editUser = toggle;
  }

  edit(user: UserResponse) {
    this.selectedUser = user;
    this._editUser = true;
  }

  toggleNavbar() {
    this.dashboard.navbar = true;
  }
}
