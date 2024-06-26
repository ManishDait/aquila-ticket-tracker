import { Routes } from '@angular/router';
import { SignupComponent } from './component/auth/signup/signup.component';
import { LoginComponent } from './component/auth/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/dashboard/home/home.component';
import { ProjectComponent } from './component/dashboard/project/project.component';
import { TicketComponent } from './component/dashboard/ticket/ticket.component';
import { ViewProjectComponent } from './component/view-project/view-project.component';
import { ViewTicketComponent } from './component/view-ticket/view-ticket.component';
import { adminGuard } from './guard/admin.guard';
import { ManagementComponent } from './component/dashboard/management/management.component';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, children: [
        {path: 'home', component: HomeComponent},
        {path: 'project', component: ProjectComponent},
        {path: 'ticket', component: TicketComponent},
        {path: 'manage', component: ManagementComponent, canActivate: [adminGuard]},
        {path: '**', redirectTo: 'home'}
    ], canActivate: [userGuard]},
    {path: 'project', component: ViewProjectComponent},
    {path: 'ticket', component: ViewTicketComponent},
    {path: '**', redirectTo: 'signup'}
];
