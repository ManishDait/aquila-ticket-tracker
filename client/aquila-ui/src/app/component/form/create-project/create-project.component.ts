import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserResponse } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ProjectRequest } from '../../../model/project';
import { AuthService } from '../../../service/auth.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ProjectService } from '../../../service/project.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from '../../dashboard/project/project.component';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})

export class CreateProjectComponent {
  users: UserResponse[] = [];
  username: string;
  faArrowDown = faChevronDown;

  selectUser: boolean = false;

  request: ProjectRequest = {
    name: '',
    code: '',
    description: '',
    teamMembers: []
  }

  projectForm: FormGroup;

  constructor (private userService: UserService, private authService: AuthService, private project:ProjectComponent, private projectService: ProjectService) {
    this.username = this.authService.getUsername();

    this.projectForm = new FormGroup({
      'name': new FormControl(),
      'code': new FormControl(),
      'description': new FormControl()
    });

    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }

  addToMember(user: string) {
    this.request.teamMembers.push(user);
  }

  cancel() {
    this.project.createProject = false;
  }

  onSubmit() {
    this.request.name = this.projectForm.get('name')!.value;
    this.request.description = this.projectForm.get('description')!.value;
    this.request.code = this.projectForm.get('code')!.value;

    this.request.code = this.request.code.toUpperCase();

    this.projectService.createProject(this.request).subscribe(
      (res) => {
        console.log(res);
        this.project.projects.push(res);
        this.cancel();
      }
    );
  }
}
