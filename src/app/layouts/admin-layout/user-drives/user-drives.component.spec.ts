import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDrivesComponent } from './user-drives.component';

describe('UserDrivesComponent', () => {
  let component: UserDrivesComponent;
  let fixture: ComponentFixture<UserDrivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDrivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
