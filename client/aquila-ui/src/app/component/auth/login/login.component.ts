import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LoginRequest } from '../../../model/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  request: LoginRequest = {
    username: '',
    password: ''
  };

  constructor (private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      'username': new FormControl(),
      'password': new FormControl()
    });
  }

  onSubmit() {
    this.request.username = this.loginForm.get('username')!.value;
    this.request.password = this.loginForm.get('password')!.value;

    this.authService.login(this.request).subscribe(
      (res) => {
        this.router.navigate(['dashboard/home']);
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }
}
