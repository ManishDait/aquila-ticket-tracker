import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUserManagementComponent } from './project-user-management.component';

describe('UserManagementComponent', () => {
  let component: ProjectUserManagementComponent;
  let fixture: ComponentFixture<ProjectUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectUserManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
