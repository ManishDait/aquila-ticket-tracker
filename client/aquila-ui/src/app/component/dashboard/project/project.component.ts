import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DashboardComponent } from '../dashboard.component';
import { ProjectService } from '../../../service/project.service';
import { ProjectResponse } from '../../../model/project';
import { Router } from '@angular/router';
import { CreateProjectComponent } from '../../form/create-project/create-project.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [FontAwesomeModule, CreateProjectComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  faMenu = faBars;

  projects: ProjectResponse[] = [];
  private _createProject: boolean = false;

  constructor (private dashboard:DashboardComponent, private projectService: ProjectService, private router: Router) {
    this.projectService.getProjectsByUser().subscribe(
      (res) => {
        this.projects = res;
        console.log(res);  
      }, (err) => {
        console.log('Error:', err);
      }
    );
  }

  toggleNavbar() {
    this.dashboard.navbar = true;
  }

  get createProject(): boolean {
    return this._createProject;
  }

  set createProject(toggel: boolean) {
    this._createProject = toggel;
  }

  viewProject(project: ProjectResponse) {
    this.router.navigate(['project'], {queryParams: {id: project.code}})
  }

  getRole(): string {
    return this.dashboard.role;
  }
}
