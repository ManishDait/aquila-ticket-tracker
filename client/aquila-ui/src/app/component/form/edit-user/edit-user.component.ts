import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRequest, UserResponse } from '../../../model/user';
import { Constant } from '../../../app-constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faL, faPen } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from '../../dashboard/management/management.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})

export class EditUserComponent {
  @Input() user!: UserResponse;
  faArrowDown = faChevronDown;
  
  selectRole: boolean = false;

  constructor (private management: ManagementComponent, private userService:UserService) {}

  getRoles(): string[] {
    return Constant.ROLES;
  }

  setRole(role: string) {
    this.user.role = role;
    this.selectRole = false;
  }

  onSubmit(pass: string) {
    var request: UserRequest = {
      name: this.user.name,
      email: this.user.email,
      role: this.user.role,
      password: null,
      enabled: this.user.enabled
    }
    
    if (pass != '') {
      request.password = pass;
    }

    console.log(request);

    this.userService.updateUser(request).subscribe(
      (data) => {
        this.management.getUsers();
        this.cancel();
      }
    );
  }

  cancel() {
    this.management.editUser = false;
  }
}
