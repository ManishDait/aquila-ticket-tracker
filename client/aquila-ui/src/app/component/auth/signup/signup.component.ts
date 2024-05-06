import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { SignupRequest } from '../../../model/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  signupForm: FormGroup;
  request: SignupRequest = {
    email: '',
    username: '',
    password: ''
  };

  constructor (private authService: AuthService) {
    this.signupForm = new FormGroup({
      'email': new FormControl(),
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

  onSubmit() {
    this.request.email = this.signupForm.get('email')!.value;
    this.request.username = this.signupForm.get('username')!.value;
    this.request.password = this.signupForm.get('password')!.value;

    this.authService.createUser(this.request).subscribe(
      (res) => {
        console.log("Account Created");
      }, (err) => {
        console.log('Error: ', err);
      }
    );
  }
}
