import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../../model/user';
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

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
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
