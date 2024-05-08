import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../../model/project';
import { ProjectService } from '../../../service/project.service';
import { ViewProjectComponent } from '../../view-project/view-project.component';
import { UserService } from '../../../service/user.service';
import { UserResponse } from '../../../model/user';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-user-management',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './project-user-management.component.html',
  styleUrl: './project-user-management.component.css'
})

export class ProjectUserManagementComponent {
  @Input() project!: ProjectResponse;

  faArrowDown = faChevronDown;
  faClose = faXmark;

  users: UserResponse[] = [];

  constructor (private projectService: ProjectService, private userService: UserService, private _project: ViewProjectComponent) {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
      }
    );
  }

  isAssigned(user: UserResponse): boolean {
    for (var u of this.project.teamMembers) {
      if (u.name == user.name) {
        return true;
      }
    }

    return false;
  }

  removeFromMember(user: UserResponse) {
    var indx = this.project.teamMembers.indexOf(user);
    this.project.teamMembers.splice(indx, 1);
  }

  addAssignee(user: UserResponse) {
    this.project.teamMembers.push(user);
  }

  onSubmit() {
    this.projectService.updateProject(this.project).subscribe(
      (res) => {
        this._project.project = res;
        this.cancel();
      }
    );
  }

  cancel() {
    this._project.manageUser = false;
  }
}
