import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { SignupRequest } from '../../../model/auth';
import { ManagementComponent } from '../../dashboard/management/management.component';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup;
  request: SignupRequest = {
    email: '',
    username: '',
    password: ''
  }

  constructor (private authService: AuthService, private management: ManagementComponent) {
    this.userForm = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  onSubmit() {
    this.request.email = this.userForm.get('email')!.value;
    this.request.username = this.userForm.get('name')!.value;
    this.request.password = this.userForm.get('password')!.value;

    this.authService.createUser(this.request).subscribe(
      (res) => {
        this.management.getUsers();
        this.cancel();
      }
    );
  }

  cancel() {
    this.management.manageUser = false;
  }
}
