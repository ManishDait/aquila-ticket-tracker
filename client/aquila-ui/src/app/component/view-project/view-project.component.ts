import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectService } from '../../service/project.service';
import { TicketService } from '../../service/ticket.service';
import { ProjectResponse } from '../../model/project';
import { TicketResponse } from '../../model/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTicketComponent } from '../form/create-ticket/create-ticket.component';
import { UserResponse } from '../../model/user';
import { faBars, faCircle, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { EditProjectComponent } from '../form/edit-project/edit-project.component';
import { ProjectUserManagementComponent } from '../form/project-user-management/project-user-management.component';

@Component({
  selector: 'app-view-project',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, CreateTicketComponent, EditProjectComponent, ProjectUserManagementComponent],
  templateUrl: './view-project.component.html',
  styleUrl: './view-project.component.css'
})

export class ViewProjectComponent {
  faMenu = faBars;
  faStatus = faCircleDot;
  faPriority = faCircle;
  faCompleted = faCircleCheck;

  private _project: ProjectResponse = {
    id: 0,
    code: '',
    name: '',
    description: '',
    ticketCount: 0,
    teamMembers: []
  };

  private _tickets: TicketResponse[] = [];
  private _createTicket: boolean = false;
  private _editProject: boolean = false;
  private _manageUser: boolean = false;

  constructor (private router: Router, private projectService: ProjectService, private ticketService: TicketService, private activeRoute: ActivatedRoute) { 
    activeRoute.queryParams.subscribe(
      (params) => {
        if (params['id'] != null && params['id'] != undefined) {
          this.projectService.getProjectByCode(params['id']).subscribe(
            (res) => {
              this._project = res;
              this.getTicket(res.code);
            }
          );
        }
      }
    );
  }

  get project(): ProjectResponse {
    return this._project;
  }

  set project(project: ProjectResponse) {
    this._project = project;
  }

  get tickets(): TicketResponse[] {
    return this._tickets;
  }

  set tickets(ticket: TicketResponse) {
    this._tickets.push(ticket);
  }

  get createTicket(): boolean {
    return this._createTicket;
  }

  set createTicket(toggle: boolean) {
   this._createTicket = toggle;
  }

  get editProject(): boolean {
    return this._editProject;
  }

  set editProject(toggle: boolean) {
   this._editProject = toggle;
  }

  get manageUser(): boolean {
    return this._manageUser;
  }

  set manageUser(toggle: boolean) {
   this._manageUser = toggle;
  }

  get teamMembers(): UserResponse[] {
    return this.project.teamMembers;
  } 

  getTicket(code: string) {
    this.ticketService.getTicketByProject(code).subscribe(
      (res) => {
        this._tickets = res;
      }
    );
  }

  viewTicket(ticket: TicketResponse) {
    this.router.navigate(['ticket'], {queryParams: {id: ticket.id}});
  }
}

