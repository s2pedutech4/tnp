import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivelistComponent } from './drivelist.component';

describe('DrivelistComponent', () => {
  let component: DrivelistComponent;
  let fixture: ComponentFixture<DrivelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
