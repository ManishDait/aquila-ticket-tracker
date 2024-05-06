import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUserManagementComponent } from './ticket-user-management.component';

describe('TicketUserManagementComponent', () => {
  let component: TicketUserManagementComponent;
  let fixture: ComponentFixture<TicketUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketUserManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
